import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref(
    JSON.parse(localStorage.getItem('tasks') || '[]')
  )

  function addTask(task) {
    tasks.value.push({
      id: Date.now(),
      title: task.title,
      done: false,
      createdAt: new Date().toISOString()
    })
  }

  function toggleTask(id) {
    const t = tasks.value.find(t => t.id === id)
    if (t) t.done = !t.done
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  watch(
    tasks,
    (val) => {
      localStorage.setItem('tasks', JSON.stringify(val))
    },
    { deep: true }
  )

  return { tasks, addTask, toggleTask, removeTask }
})
