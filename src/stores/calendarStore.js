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

    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events))
    }
  }
})
