import { defineStore } from 'pinia'

const STORAGE_KEY = 'calendar-events'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    events: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }),

  actions: {
    addEvent(event) {
      this.events.push(event)
      this.persist()
    },

    removeEvent(id) {
      this.events = this.events.filter(e => e.id !== id)
      this.persist()
    },

    // 👇 🔥 AÑADE ESTO
    updateEvent(updatedEvent) {
      const index = this.events.findIndex(e => e.id === updatedEvent.id)
      if (index !== -1) {
        this.events.splice(index, 1, updatedEvent) // reactivo ✅
        this.persist() // 🔥 MUY IMPORTANTE (si no, no guarda)
      }
    },

    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events))
    }
  }
})