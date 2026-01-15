import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useShoppingStore = defineStore('shopping', () => {
  const items = ref(
    JSON.parse(localStorage.getItem('shopping') || '[]')
  )

  function addItem(name) {
    items.value.unshift({
      id: Date.now(),
      name,
      bought: false
    })
  }

  function toggleItem(id) {
    const i = items.value.find(i => i.id === id)
    if (i) i.bought = !i.bought
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  watch(
    items,
    (val) => {
      localStorage.setItem('shopping', JSON.stringify(val))
    },
    { deep: true }
  )

  return { items, addItem, toggleItem, removeItem }
})
