// src/stores/notesStore.js
import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),
  actions: {
    addNote(note) {
      this.notes.push(note)
    }
  }
})
