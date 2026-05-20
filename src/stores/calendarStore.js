import { defineStore } from 'pinia'

const STORAGE_KEY = 'calendar-events'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    events: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      .map(e => ({
        id: e.id,
        title: e.title,
        start: e.start,
        end: e.end,
        priority: e.priority || 'medium',
        backgroundColor: e.backgroundColor || '#3b82f6'
      }))
  }),

  actions: {

    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events))
    },

    applyPriorityColor(event) {
      const colors = {
        high: '#ef4444',
        medium: '#f59e0b',
        low: '#10b981'
      }

      return {
        ...event,
        backgroundColor: colors[event.priority] || '#3b82f6'
      }
    },

    addEvent(event) {
      const safe = this.applyPriorityColor({
        id: event.id || Date.now(),
        title: event.title,
        start: event.start,
        end: event.end,
        priority: event.priority || 'medium'
      })

      this.events.push(safe)
      this.persist()
    },

updateEvent(updated) {
  const index = this.events.findIndex(
    e => Number(e.id) === Number(updated.id)
  )

  if (index !== -1) {
    this.events[index] = this.applyPriorityColor({
      ...this.events[index],
      ...updated
    })

    this.persist()
  }
},
    removeEvent(id) {
      this.events = this.events.filter(
        e => Number(e.id) !== Number(id)
      )
      this.persist()
    }
  }
})