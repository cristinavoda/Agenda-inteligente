export function scheduleReminder(item, speak) {
  if (!item.dateTime || !item.reminder) return

  const eventTime = new Date(item.dateTime).getTime()
  const reminderMinutes = Number(item.reminder)
  const reminderTime = eventTime - reminderMinutes * 60 * 1000
  const timeout = reminderTime - Date.now()

  if (timeout <= 0) return

  setTimeout(() => {
    // 🔔 NOTIFICACIÓN DEL SISTEMA
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('📅 Recordatorio', {
        body: item.title,
        silent: false
      })
    }

    // 🗣️ VOZ
    if (typeof speak === 'function') {
      speak(`Recordatorio. ${item.title}`)
    }
  }, timeout)
}
