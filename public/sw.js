importScripts(
  'https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js'
)

importScripts(
  'https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js'
)

firebase.initializeApp({
  apiKey: 'BNnhW__bNQri71ufD5-JUxylQgisDSiVff2x6UQoBMguer_6EBynvcj0ErzaMbjYACYlArbQbemPDwGcWyDsQjU',
  authDomain: 'agenda-inteligente-cdb91.firebaseapp.com',
  projectId: 'agenda-inteligente-cdb91',
  storageBucket: 'agenda-inteligente-cdb91.firebasestorage.app',
  messagingSenderId: '475077910072',
  appId: '1:475077910072:web:3295ceba1750c8316d90cd'
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Agenda Inteligente'

  const options = {
    body: payload.notification?.body || 'Tienes un recordatorio pendiente',
    icon: '/icon.png'
  }

  self.registration.showNotification(title, options)
})

self.addEventListener('install', () => {
  console.log(' SW instalado')
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  console.log(' SW activo')
})


self.addEventListener('message', event => {
  if (event.data.type === 'SCHEDULE_REMINDER') {
    const reminder = event.data.reminder
    const delay = reminder.notifyAt - Date.now()
    if (delay <= 0) return

    setTimeout(() => {
      self.registration.showNotification(' Recordatorio', {
        body: reminder.title,
        icon: '/icon.png',
        actions: [
          { action: 'snooze', title: '⏱️ Recordar 10 min' }
        ]
      })
    }, delay)
  }
})


self.addEventListener('notificationclick', event => {
  const reminder = event.notification
  event.notification.close()

  if (event.action === 'snooze') {
    
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        clientList.forEach(client => {
          client.postMessage({ type: 'SNOOZE_REMINDER', reminder })
        })
      })
    )
  } else {
    
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        const client = clientList.find(c => !c.focused)
        if (client) {
          client.focus()
          client.postMessage({ type: 'OPEN_AGENDA' })
        } else {
          client.openWindow('/agenda')
        }
      })
    )
  }
})