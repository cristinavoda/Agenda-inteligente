import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref(
    JSON.parse(localStorage.getItem('notes') || '[]')
  )

  function addNote(note) {
    notes.value.unshift({
      id: Date.now(),
      content: note.content,
      createdAt: new Date().toISOString()
    })
  }

  function removeNote(id) {
    notes.value = notes.value.filter(n => n.id !== id)
  }

  watch(
    notes,
    (val) => {
      localStorage.setItem('notes', JSON.stringify(val))
    },
    { deep: true }
  )

  return { notes, addNote, removeNote }
})
