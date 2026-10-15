
import { defineStore } from 'pinia'
import {
  createFirestoreUserCollection,
  toMillis
} from '../services/firestoreUserCollection'

export const useShoppingStore = defineStore('shopping', () => {
  const cloud = createFirestoreUserCollection({
    collectionName: 'shoppingItems',
    storageKey: 'shopping',

    normalize(item = {}) {
      return {
        title: String(item.title ?? ''),
        quantity: String(item.quantity ?? ''),
        priority: String(item.priority ?? ''),
        done: Boolean(item.done),
        createdAt: toMillis(item.createdAt)
      }
    }
  })

  function addItem(item) {
    return cloud.addItem({
      ...item,
      createdAt: item.createdAt ?? Date.now()
    })
  }

  async function toggleItem(id) {
    const item = cloud.items.value.find((entry) => entry.id === id)
    if (!item) return false

    return cloud.updateItem({
      ...item,
      done: !item.done
    })
  }

  return {
    items: cloud.items,
    ready: cloud.ready,
    addItem,
    updateShopping: cloud.updateItem,
    toggleItem,
    removeItem: cloud.removeItem,
    clearShoppingList: cloud.clearItems
  }
})
