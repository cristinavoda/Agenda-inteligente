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
    createdAt: Date.now()
  })
  this.persist()
},


    removeNote(id) {
      this.$patch(state => { state.notes = state.notes.filter(n => n.id !== id) })
      this.persist()
    },

    removeAllNotes() {
      this.$patch(state => { state.notes = [] })
      this.persist()
    },

    persist() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
  }
})
