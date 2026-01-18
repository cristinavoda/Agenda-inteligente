

const STORAGE_KEY = 'reminders'


function loadReminders() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}


function saveReminders(reminders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders))
}


export function createReminderFromEvent(event) {
 if (!event.reminder || !event.start) return null

const notifyAt =
  new Date(event.start).getTime() -
  Number(event.reminder) * 60 * 1000
 

  if (notifyAt <= Date.now()) return null

  return {
    id: `rem-${event.id}`,
    title: event.title,
    notifyAt,
    fired: false
  }
}


export function saveReminder(reminder) {
  const reminders = loadReminders()

  const exists = reminders.some(r => r.id === reminder.id)
  if (exists) return

  reminders.push(reminder)
  saveReminders(reminders)

  window.dispatchEvent(
    new CustomEvent('reminder-added', { detail: reminder })
  )
}


export function markAsFired(id) {
  const reminders = loadReminders()
  reminders.forEach(r => {
    if (r.id === id) r.fired = true
  })
  saveReminders(reminders)
}


export function getPendingReminders() {
  return loadReminders().filter(
    r => !r.fired && r.notifyAt > Date.now()
  )
}
