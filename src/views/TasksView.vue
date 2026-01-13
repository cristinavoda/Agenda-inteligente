<template>
  <div>
    <h1>Tareas</h1>
    

    <p>Total tareas: {{ taskStore.tasks.length }}</p>

    <ul>
      <li v-for="task in taskStore.tasks" :key="task.id">
        {{ task.time }} — {{ task.title }}
      </li>
    </ul>
  </div>
  
</template>
<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

onMounted(() => {
  // Solo añadir ejemplo si el store está vacío
  if (taskStore.tasks.length === 0) {
    taskStore.addTask({
      title: 'Reunión con cliente',
      date: '2026-01-11', // formato YYYY-MM-DD
      time: '12:00'
    })
    taskStore.addTask({
      title: 'Llamar al banco',
      date: '2026-01-11',
      time: '16:00'
    })
  }
})
</script>
