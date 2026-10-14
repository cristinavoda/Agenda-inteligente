
import { adminDb, adminMessaging } from '../lib/firebaseAdmin.mjs'
import { FieldValue } from 'firebase-admin/firestore'

const GRACE_PERIOD_MS = 5 * 60 * 1000

export default async function sendReminders() {
  const now = Date.now()

  const eventsSnapshot = await adminDb
    .collection('events')
    .where('reminder', '>', 0)
    .get()

  let sentEvents = 0

  for (const eventDoc of eventsSnapshot.docs) {
    const event = eventDoc.data()
    const minutes = Number(event.reminder)

    if (!event.uid || !event.start || minutes <= 0) continue

    const startTime = new Date(event.start).getTime()
    if (!Number.isFinite(startTime)) continue

    const notifyAt = startTime - minutes * 60_000
    const lateness = now - notifyAt

    // Esperar hasta la hora prevista y evitar avisos antiguos.
    if (lateness < 0 || lateness > GRACE_PERIOD_MS) continue

    // La marca cambia si se modifica la hora o la antelación.
    const reminderKey = `${event.start}|${minutes}`

    if (event.reminderSentKey === reminderKey) continue

    const tokenSnapshot = await adminDb
      .collection('users')
      .doc(event.uid)
      .collection('fcmTokens')
      .get()

    // Agrupar tokens iguales para evitar avisos duplicados.
    const uniqueTokens = new Map()

    for (const tokenDoc of tokenSnapshot.docs) {
      const token = tokenDoc.data().token
      if (typeof token !== 'string' || !token) continue

      if (!uniqueTokens.has(token)) {
        uniqueTokens.set(token, {
          token,
          refs: []
        })
      }

      uniqueTokens.get(token).refs.push(tokenDoc.ref)
    }

    if (uniqueTokens.size === 0) {
      console.warn('Sin dispositivos registrados para el evento:', eventDoc.id)
      continue
    }

    let successfulSends = 0

    for (const { token, refs } of uniqueTokens.values()) {
      try {
        await adminMessaging.send({
          token,
          data: {
            title: '✧ Recordatorio',
            body: String(event.title || 'Tienes un recordatorio pendiente'),
            eventId: eventDoc.id,
            url: '/agenda'
          },
          webpush: {
            headers: {
              TTL: '3600',
              Urgency: 'high'
            }
          }
        })

        successfulSends++
      } catch (error) {
        console.error(
          'Error FCM:',
          error.code || error.name || 'UNKNOWN_ERROR'
        )

        // Retirar tokens que Firebase confirma que ya no son válidos.
        if (
          [
            'messaging/registration-token-not-registered',
            'messaging/invalid-registration-token'
          ].includes(error.code)
        ) {
          await Promise.all(
            refs.map((ref) => ref.delete().catch(() => {}))
          )
        }
      }
    }

    if (successfulSends > 0) {
      await eventDoc.ref.update({
        reminderSentKey: reminderKey,
        reminderSentAt: FieldValue.serverTimestamp(),
        reminderSentCount: successfulSends
      })

      sentEvents++
    }
  }

  console.log('Recordatorios enviados:', sentEvents)
}

export const config = {
  schedule: '* * * * *'
}
