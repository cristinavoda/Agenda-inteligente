import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useShoppingStore = defineStore('shopping', () => {
  const items = ref(JSON.parse(localStorage.getItem('shopping') || '[]'))

  function addItem(name) {
    items.value.unshift({ id: Date.now(), name, bought: false })
    persist()
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
    persist()
  }

  function removeAllItems() {
    items.value = []
    persist()
  }

  function persist() {
    localStorage.setItem('shopping', JSON.stringify(items.value))
  }

  return { items, addItem, removeItem, removeAllItems }
})
