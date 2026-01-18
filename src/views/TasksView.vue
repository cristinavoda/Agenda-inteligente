<template>
  <div class="tasks-container">
    <h2>Tareas</h2>

    <!-- Input rápido -->
    <div class="task-input">
      <input
        v-model="newTask"
        placeholder="Añadir tarea…"
        @keyup.enter="add"
      />
      <button class="btn-add" @click="add">+</button>
    </div>

    <!-- Lista numerada -->
    <ul class="task-list">
      <li v-for="(task, index) in taskStore.tasks" :key="task.id">
        <span class="number">{{ index + 1 }}.</span>
        <span class="title">{{ task.title }}</span>
        <button class="remove" @click="remove(task.id)">✖</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTasksStore } from '../stores/tasksStore'

const taskStore = useTasksStore()
const newTask = ref('')

function add() {
  if (!newTask.value.trim()) return
  taskStore.addTask(newTask.value.trim())
  newTask.value = ''
}

function remove(id) {
  taskStore.removeTask(id)
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
  border: #b8b2b2 solid 0.5px;
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
  border: none;
  cursor: pointer;
  opacity: 0.5;
}

.remove:hover {
  opacity: 1;
}
</style>