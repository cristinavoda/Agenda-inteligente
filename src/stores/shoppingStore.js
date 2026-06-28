import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useShoppingStore = defineStore('shopping', () => {

  const items = ref(
    JSON.parse(localStorage.getItem('shopping') || '[]')
  )

  function persist() {
    localStorage.setItem('shopping', JSON.stringify(items.value))
  }

  function addItem(item) {
    items.value.unshift({
      id: item.id || Date.now(),
      title: item.title,
      quantity: item.quantity || '',
      priority: item.priority || '',
      done: item.done ?? false
    })

    persist()
  }

  function updateShopping(item) {
    const index = items.value.findIndex(i => i.id === item.id)

    if (index === -1) return

    items.value[index] = {
      ...items.value[index],
      ...item
    }

    persist()
  }
 function clearShoppingList() {
    items.value = []
    persist()
  }
  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
    persist()
  }

  return {
    items,
    addItem,
    updateShopping,
    removeItem,
     clearShoppingList 
  }
})