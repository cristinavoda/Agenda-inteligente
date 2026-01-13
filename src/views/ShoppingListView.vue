<template>
  <div>
    <h1>Lista de la compra</h1>
      <p>Total artículos: {{ shoppingStore.items.length }}</p>

    <ul>
      <li v-for="item in shoppingStore.items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useShoppingStore } from '../stores/shoppingStore'

const shoppingStore = useShoppingStore()

onMounted(() => {
  if (!shoppingStore.items.length) {
    shoppingStore.addItem({ name: 'Leche' })
    shoppingStore.addItem({ name: 'Pan' })
    shoppingStore.addItem({ name: 'Huevos' })
  }
})
</script>
