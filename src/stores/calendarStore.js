import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    events: JSON.parse(localStorage.getItem('events') || '[]')
  }),
 actions: {
  addEvent(event) {
    this.events.push(event)
    localStorage.setItem('calendarEvents', JSON.stringify(this.events))
  },
  removeEvent(id) {
    this.events = this.events.filter(e => e.id !== id)
    localStorage.setItem('calendarEvents', JSON.stringify(this.events))
  },
  loadEvents() {
    const saved = localStorage.getItem('calendarEvents')
    if (saved) this.events = JSON.parse(saved)
  }
}

})
