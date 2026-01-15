// src/stores/notesStore.js
import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: JSON.parse(localStorage.getItem('notes') || '[]')
  }),

  actions: {
    addNote(content) {
      this.notes.unshift({
        id: Date.now(),
        content,
        createdAt: new Date().toISOString()
      })
      this.persist()
    },

    removeNote(id) {
      this.notes = this.notes.filter(n => n.id !== id)
      this.persist()
    },

    persist() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
  }
})
