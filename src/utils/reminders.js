export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false
  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

export async function scheduleReminder({ title, body, delayMs }) {
  const granted = await requestNotificationPermission()
  if (!granted) return

  setTimeout(() => {
    new Notification(title, { body })
  }, delayMs)
}
