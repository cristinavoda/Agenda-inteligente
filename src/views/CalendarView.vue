<template>
  <div class="shopping-container">
    <h2>Lista de la compra</h2>

    <!-- Input -->
    <div class="shop-input">
      <input
        v-model="newItem"
        placeholder="Añadir producto…"
        @keyup.enter="add"
      />
      <button @click="add">+</button>
    </div>

    <!-- Lista -->
    <ul class="shop-list">
      <li
        v-for="(item, index) in shoppingStore.items"
        :key="item.id"
        :class="{ bought: item.bought }"
      >
        <span class="number">{{ index + 1 }}.</span>

        <span
          class="name"
          @click="toggle(item.id)"
        >
          {{ item.name }}
        </span>

        <button class="remove" @click="remove(item.id)">✖</button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useShoppingStore } from '../stores/shoppingStore'

const shoppingStore = useShoppingStore()
const newItem = ref('')

function add() {
  if (!newItem.value.trim()) return
  shoppingStore.addItem(newItem.value.trim())
  newItem.value = ''
}

function toggle(id) {
  shoppingStore.toggleItem(id)
}

function remove(id) {
  shoppingStore.removeItem(id)
}
</script>
<style scoped>
.shopping-container {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
}   </style>    