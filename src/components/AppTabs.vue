<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = [
  { label: 'Agenda', path: '/agenda' },
  { label: 'Tareas', path: '/tasks' },
  { label: 'Compra', path: '/shopping' },
  { label: 'Notas', path: '/notes' }
]
</script>

<template>
  <nav class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.path"
      :class="{ active: route.path === tab.path }"
      @click="router.push(tab.path)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 12px;
  padding: 10px 16px;
  background: white;
  border-bottom: 1px solid #eee;
}

.tabs button {
  background: none;
  border: none;
  padding: 6px 10px;
  font-weight: 500;
  color: #777;
}

.tabs .active {
  color: black;
  border-bottom: 2px solid black;
}
</style>
