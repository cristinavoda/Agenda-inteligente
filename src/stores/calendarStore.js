
import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    events: []
  }),

  actions: {
   
    setEvents(events) {
      this.events = events
    },

    
    addEvent(event) {
      this.events.push(event)
    },

    
    updateEvent(updated) {
      const index = this.events.findIndex(
        event => String(event.id) === String(updated.id)
      )

      if (index !== -1) {
        this.events[index] = {
          ...this.events[index],
          ...updated
        }
      }
    },

    
    removeEvent(id) {
      this.events = this.events.filter(
        event => String(event.id) !== String(id)
      )
    }
  }
})
