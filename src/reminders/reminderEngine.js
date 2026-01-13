// src/reminders/reminderEngine.js

const STORAGE_KEY = 'reminders'

// 🔹 cargar recordatorios
function loadReminders() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

// 🔹 guardar recordatorios
function saveReminders(reminders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders))
}

// 🔹 crear recordatorio desde un evento
export function createReminderFromEvent(event) {
  if (!event.reminder || !event.dateTime) return null

  const notifyAt =
    new Date(event.dateTime).getTime() -
    Number(event.reminder) * 60 * 1000

  if (notifyAt <= Date.now()) return null

  return {
    id: `rem-${event.id}`,
    title: event.title,
    notifyAt,
    fired: false
  }
}

// 🔹 guardar recordatorio (sin duplicados)
export function saveReminder(reminder) {
  const reminders = loadReminders()

  const exists = reminders.some(r => r.id === reminder.id)
  if (exists) return

  reminders.push(reminder)
  saveReminders(reminders)
}

// 🔹 marcar como disparado
export function markAsFired(id) {
  const reminders = loadReminders()
  reminders.forEach(r => {
    if (r.id === id) r.fired = true
  })
  saveReminders(reminders)
}

// 🔹 obtener pendientes
export function getPendingReminders() {
  return loadReminders().filter(
    r => !r.fired && r.notifyAt > Date.now()
  )
}
