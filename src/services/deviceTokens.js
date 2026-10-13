
import { db } from '../firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export async function saveDeviceToken(uid, token) {
  if (!uid || !token) {
    throw new Error('Falta el usuario o el token FCM')
  }

  const deviceId = crypto.randomUUID()

  await setDoc(doc(db, 'users', uid, 'fcmTokens', deviceId), {
    token,
    platform: navigator.userAgent,
    updatedAt: serverTimestamp()
  })

  console.log('Token FCM guardado en Firestore')
}
