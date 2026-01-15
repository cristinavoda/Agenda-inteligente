<template>
  <div class="notes-container">
    <h2>Notas</h2>

    <!-- Input -->
    <textarea
      v-model="newNote"
      placeholder="Escribe una nota…"
      rows="3"
    />

    <button @click="addNote">Guardar nota</button>

    <!-- Lista -->
    <ul class="notes-list">
      <li v-for="note in notesStore.notes" :key="note.id">
        <div class="note-content">{{ note.content }}</div>
        <div class="note-footer">
          <small>{{ formatDate(note.createdAt) }}</small>
          <button @click="remove(note.id)">✖</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useNotesStore } from '../stores/notesStore'

const notesStore = useNotesStore()
const newNote = ref('')

function addNote() {
  if (!newNote.value.trim()) return
  notesStore.addNote(newNote.value.trim())
  newNote.value = ''
}

function remove(id) {
  notesStore.removeNote(id)
}

function formatDate(date) {
  return new Date(date).toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}
</script>
<style scoped>

.notes-container {
  max-width: 600px;
  margin: auto;
}
.notes-container {
  max-width: 600px;
  margin: auto;
}

textarea {
  width: 100%;
  padding: 8px;
  resize: vertical;
  margin-bottom: 8px;
}

.notes-list {
  list-style: none;
  padding: 0;
  margin-top: 16px;
}

.notes-list li {
  padding: 12px 0;
  border-bottom: 1px solid #e5e5ea;
}

.note-content {
  font-size: 1rem;
  white-space: pre-wrap;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  color: #999;
}

.note-footer button {
  background: transparent;
  border: none;
  cursor: pointer;
}
.note-footer button:hover {
  color: #333;
}
</style>