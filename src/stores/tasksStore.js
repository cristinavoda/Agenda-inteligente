// src/stores/taskStore.js
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  }),

  actions: {
    addTask(title) {
      this.tasks.push({
        id: Date.now(),
        title
      })
      this.persist()
    },

    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.persist()
    },

    persist() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
})
