
import { getToken, onMessage } from 'firebase/messaging'
import { messagingPromise } from "../firebase";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY

export async function registerPushNotifications() {
  if (!('serviceWorker' in navigator) || !('Notification' in window)) {
    console.warn('Este navegador no admite notificaciones web')
    return null
  }

  
const permission = Notification.permission

console.log(
  'Permiso dentro de registerPushNotifications:',
  permission
)

if (permission !== 'granted') {
  console.warn('Permiso de notificaciones no concedido')
  return null
}

try {
  const registration =
    await navigator.serviceWorker.register('/sw.js')

  await navigator.serviceWorker.ready
    
  const messaging = await messagingPromise
  const token = await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: registration
  })

  console.log('Token FCM obtenido:', !!token)

  if (!token) {
    console.warn('No se ha obtenido un token FCM')
    return null
  }

  console.log('Token FCM obtenido correctamente')
  return token
} catch (error) {
  console.error('Error al registrar notificaciones push:', error)
  return null
}
}

export async function listenForForegroundMessages(callback) {
  const messaging = await messagingPromise

  if (!messaging) {
    console.warn('Firebase Messaging no está disponible')
    return () => {}
  }

  return onMessage(messaging, callback)
}