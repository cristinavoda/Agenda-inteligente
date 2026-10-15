
import { defineStore } from 'pinia'
import {
  createFirestoreUserCollection,
  toMillis
} from '../services/firestoreUserCollection'

export const useNotesStore = defineStore('notes', () => {
  const cloud = createFirestoreUserCollection({
    collectionName: 'notes',
    storageKey: 'notes',

    normalize(note = {}) {
      return {
        title: String(note.title ?? ''),
        content: String(note.content ?? ''),
        priority: note.priority || 'normal',
        done: Boolean(note.done),
        createdAt: toMillis(note.createdAt)
      }
    }
  })

  function addNote(content) {
    return cloud.addItem({
      title: '',
      content: String(content ?? '').trim(),
      priority: 'normal',
      done: false,
      createdAt: Date.now()
    })
  }

  return {
    notes: cloud.items,
    ready: cloud.ready,
    addNote,
    updateNote: cloud.updateItem,
    removeNote: cloud.removeItem,
    removeAllNotes: cloud.clearItems
  }
})

