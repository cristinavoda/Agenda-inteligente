import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),

  actions: {
    addTask(task) {
      this.tasks.push({
        id: Date.now(),
        completed: false,
        ...task
      })
    },

    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) task.completed = !task.completed
    }
  }
})
