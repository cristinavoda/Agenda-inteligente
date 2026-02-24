import { defineStore } from 'pinia'

export const usePaFeedbackStore = defineStore('paFeedback', {
  state: () => ({
    messages: [] 
  }),

  actions: {
    show(text, type = 'success', duration = 1800) {
      const id = Date.now()
      this.messages.push({ id, text, type })

      setTimeout(() => {
        this.messages = this.messages.filter(m => m.id !== id)
      }, duration)
    }
  }
})
