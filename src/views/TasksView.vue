<template>
  <div class="tasks-container">
    <h2>Tareas</h2>

   
    <div class="task-input">
      <input
        v-model="newTask"
        placeholder="Añadir tarea…"
        @keyup.enter="addTask"
      />
      <button class="btn-add" @click="add">+</button>
    </div>

    
    <ul class="task-list">
      <li v-for="(task, index) in tasksStore.tasks" :key="task.id">
  <span class="number">{{ index + 1 }}.</span>
  <span class="title">{{ task.title }}</span>
  <button @click="remove(task.id)">✖</button>
</li>

    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTasksStore } from '../stores/tasksStore'

const tasksStore = useTasksStore()
const newTask = ref('')

function addTask() {
  if (!newTask.value.trim()) return
  tasksStore.addTask(newTask.value.trim())
  newTask.value = ''
}

function remove(id) {
  tasksStore.removeTask(id)
}

function formatDate(date) {
  return new Date(date).toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}
</script>

 <style scoped>
.tasks-container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}
.tasks-container {
  max-width: 500px;
  margin: auto;
}

.task-input {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 1rem;
}

.task-input input {
  flex: 1;
  padding: 4px;
}
.btn-add {
  padding: 6px 6px;
  cursor: pointer;
  border: white solid 0.5px;
  border-bottom: #666 solid 1.5px;
}
.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #d1d1d8;
}

.number {
  width: 24px;
  font-weight: 600;
  color: #666;
}

.title {
  flex: 1;
}

.remove {
  background: transparent;
 border: #d1d1d8;
  cursor: pointer;
  opacity: 0.5;
  border-bottom: 2px 2px #666;

}

.remove:hover {
  opacity: 1;
}
</style>