import { defineStore } from 'pinia'

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    items: [] // cada item = { name: 'Leche' }
  }),
  actions: {
    addItem(item) {
      this.items.push(item)
    }
  }
})
