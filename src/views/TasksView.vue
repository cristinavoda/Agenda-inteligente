<template>
  <div>
    <h1>Tareas</h1>
    

    <p>Total tareas: {{ tasksStore.tasks.length }}</p>

    <ul>
      <li v-for="task in tasksStore.tasks" :key="task.id">
        {{ task.time }} — {{ task.title }}
      <button  class="close-button"  @click="tasksStore.removeTask(task.id)">✖️</button>   
      </li>
    </ul>
  </div>
  
</template>
<script setup>
import { onMounted } from 'vue'
import { useTasksStore } from '../stores/tasksStore'

const tasksStore = useTasksStore()

onMounted(() => {
  if (tasksStore.tasks.length === 0) {
    tasksStore.addTask({
      title: 'Reunión con cliente',
      date: '2026-01-11',
      time: '12:00'
    })
    tasksStore.addTask({
      title: 'Llamar al banco',
      date: '2026-01-11',
      time: '16:00'
    })
  }
})
</script>

<style>
button {
  cursor: pointer;
}
.close-button {
  background: transparent;
  border: rgb(219, 213, 213) 0.5px solid;
  margin-right: 5rem;
  padding: 0.2rem 0.3rem;
  border-radius: 6px;
  color: #4e4a4a;
  font-size: 0.5rem;
  cursor: pointer;
}
</style>