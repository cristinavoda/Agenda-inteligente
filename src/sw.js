
import { initializeApp } from 'firebase/app'
import {
  getMessaging,
  onBackgroundMessage
} from 'firebase/messaging/sw'
import { precacheAndRoute } from 'workbox-precaching'

// 1. Mantener el precaché de la PWA
precacheAndRoute(self.__WB_MANIFEST)

// 2. Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAph5Xsq9xSZmukpPofQMod0IJhoo7E6yM',
  authDomain: 'agenda-inteligente-cdb91.firebaseapp.com',
  projectId: 'agenda-inteligente-cdb91',
  storageBucket: 'agenda-inteligente-cdb91.firebasestorage.app',
  messagingSenderId: '475077910072',
  appId: '1:475077910072:web:3295ceba1750c8316d90cd'
}

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

onBackgroundMessage(messaging, (payload) => {
  const title =
    payload.data?.title ||
    payload.notification?.title ||
    'Agenda Inteligente'

  const options = {
    body:
      payload.data?.body ||
      payload.notification?.body ||
      'Tienes un recordatorio pendiente',
    icon: '/icon.png',
    data: payload.data || {}
  }

  return self.registration.showNotification(title, options)
}) // ← Aquí se cierra onBackgroundMessage


self.addEventListener('message', (event) => {
  if (event.data?.type !== 'SCHEDULE_REMINDER') return

  const reminder = event.data.reminder
  if (!reminder || !Number.isFinite(Number(reminder.notifyAt))) return

  const delay = Number(reminder.notifyAt) - Date.now()
  if (delay <= 0) return

  setTimeout(() => {
    self.registration.showNotification('Recordatorio', {
      body: reminder.title || 'Tienes un recordatorio pendiente',
      icon: '/icon.png',
      actions: [
        { action: 'snooze', title: 'Recordar 10 min' }
      ],
      data: { reminder }
    })
  }, delay)
})


// Gestionar los clics en las notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const action = event.action
  const reminder = event.notification.data?.reminder || null

  event.waitUntil(
    self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(async (clientList) => {
      let client = clientList.find(
        (c) => new URL(c.url).origin === self.location.origin
      )

      if (!client) {
        client = await self.clients.openWindow('/agenda')
      } else {
        await client.focus()
      }

      if (client) {
        if (action === 'snooze') {
          client.postMessage({
            type: 'SNOOZE_REMINDER',
            reminder
          })
        } else {
          client.postMessage({
            type: 'OPEN_AGENDA',
            reminder
          })
        }
      }
    })
  )
})