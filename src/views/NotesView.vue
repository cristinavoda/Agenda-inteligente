<template>
  <div class="notes-container">
    <h2>Notas</h2>

   
    <textarea
      v-model="newNote"
      placeholder="Escribe una nota…"
      rows="5"
    />

    <button @click="addNote">Guardar nota</button>

    
    <ul class="notes-list">
   <li v-for="(note, index) in notesStore.notes" :key="note.id">
  <span class="number">{{ index + 1 }}.</span>

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
  if (!date) return ''
  return new Date(date).toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

</script>
<style scoped>

.notes-container {
  max-width: 900px;
  margin: auto;
}
.notes-container {
  max-width: 900px;
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
  border-bottom: 1px solid #717174;
}

.note-content {
  font-size: 1rem;
  
  justify-content: space-between;
  display: inline-flex;
  margin-top: 1px;
  color: #201f1f;
}
.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  margin-top: 6px;
  color: #999;
}

.note-footer button {
  background: transparent;
  border: white;
  border-bottom: #0f0f0f solid 2px;
  cursor: pointer;
  margin-bottom: 1px;
  height: fit-content;
}
.note-footer button:hover {
  color: #333;
}

.remove {
  background: transparent;
  border: white;
  border-bottom: #0f0f0f solid 2px;
  cursor: pointer;
  opacity: 0.5;
}

.remove:hover {
  opacity: 1;
  background-color: #999;
}
</style>