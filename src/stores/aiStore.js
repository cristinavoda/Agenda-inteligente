
import { defineStore } from 'pinia'
import { askAI } from '../services/aiService'

export const useAIStore = defineStore('ai', {
  state: () => ({
    loading: false,
    lastResponse: null
  }),

  actions: {
    async sendMessage(message) {
      this.loading = true
      try {
        const data = await askAI(message)
        this.lastResponse = data.answer
      } catch (e) {
        this.lastResponse = "No pude conectar con la IA"
      }
      this.loading = false
    }
  }
})