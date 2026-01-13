<template>
  <div>
    <h1>Notas</h1>
      <p>Total notas: {{ notesStore.notes.length }}</p>

    <ul>
      <li v-for="note in notesStore.notes" :key="note.id">
        {{ note.content }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useNotesStore } from '../stores/notesStore'

const notesStore = useNotesStore()

onMounted(() => {
  if (!notesStore.notes.length) {
    notesStore.addNote({ content: 'Comprar leche' })
    notesStore.addNote({ content: 'Idea para proyecto PA' })
    notesStore.addNote({ content: 'Llamar a mamá' })
  }
})
</script>
