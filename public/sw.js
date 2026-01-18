// sw.js
self.addEventListener('install', () => {
  console.log('🧩 SW instalado')
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  console.log('🚀 SW activo')
})

// Escucha mensajes de la app para programar reminders
self.addEventListener('message', event => {
  if (event.data.type === 'SCHEDULE_REMINDER') {
    const reminder = event.data.reminder
    const delay = reminder.notifyAt - Date.now()
    if (delay <= 0) return

    setTimeout(() => {
      self.registration.showNotification('⏰ Recordatorio', {
        body: reminder.title,
        icon: '/icon.png',
        actions: [
          { action: 'snooze', title: '⏱️ Recordar 10 min' }
        ]
      })
    }, delay)
  }
})

// Click en notificación
self.addEventListener('notificationclick', event => {
  const reminder = event.notification
  event.notification.close()

  if (event.action === 'snooze') {
    // postMessage de snooze a la app
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        clientList.forEach(client => {
          client.postMessage({ type: 'SNOOZE_REMINDER', reminder })
        })
      })
    )
  } else {
    // Abrir la app/Agenda
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
