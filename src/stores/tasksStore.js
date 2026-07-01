import { defineStore } from 'pinia'

const STORAGE_KEY = 'tasks'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  }),

  actions: {

    addTask(title) {
      this.tasks.unshift({
        id: Date.now(),
        title,
        priority: "low",
        done: false,
        editing: false,
        createdAt: Date.now()
      })

      this.persist()
    },

    updateTask(updated) {
      const i = this.tasks.findIndex(t => t.id === updated.id)

      if (i !== -1) {
        this.tasks[i] = {
          ...this.tasks[i],
          ...updated
        }
        this.persist()
      }
    },

    toggleDone(id) {
      const t = this.tasks.find(t => t.id === id)
      if (t) {
        t.done = !t.done
        this.persist()
      }
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