import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  }),

  actions: {
    addTask(title) {
      this.tasks.unshift({ id: Date.now(), title })
      this.persist()
    },

    removeTask(id) {
      this.$patch(state => {
        state.tasks = state.tasks.filter(t => t.id !== id)
      })
      this.persist()
    },

    removeAllTasks() {
      this.$patch(state => { state.tasks = [] })
      this.persist()
    },

    persist() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
})
