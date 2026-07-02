import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),

  actions: {
    setTasks(tasks) {
      this.tasks = tasks
    }
  }
})