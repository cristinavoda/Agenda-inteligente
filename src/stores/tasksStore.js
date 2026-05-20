import { defineStore } from 'pinia'
export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: "Comprar leche",
        priority: "high",
        done: false
      },
      {
        id: 2,
        title: "Estudiar Vue",
        priority: "medium",
        done: false
      }
    ]
  }),

  actions: {
  
  addTask(title) {
      this.tasks.unshift({
        id: Date.now(),
        title,
        priority: "low",
        done: false
      })

      this.persist()
    },

    persist() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
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