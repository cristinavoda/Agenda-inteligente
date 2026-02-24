<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = [
  { label: 'Agenda', path: '/agenda' },
  { label: 'Tareas', path: '/tasks' },
  { label: 'Compra', path: '/shopping' },
  { label: 'Notas', path: '/notes' }, 
  { label: 'Internet', path: '/internet' }
]
</script>

<template>
  <nav class="tabs">
    <button v-for="tab in tabs"
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
  padding: 5px 16px;
  background: white;
  font-size: 1rem;
  color: black;
  border-bottom: 1px solid #eee;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tabs button {
  background: none;
  border: none;
  padding: 6px 10px;
  font-weight: 500;
   font-size: 1rem;
  color: #363636;
}

.tabs .active {
  color: darkblue;
  border-bottom: 2px solid rgb(19, 17, 138);
  font-weight: 600;
}
.tabs button:hover {
  color: #180764a8;
}
@media (max-width: 750px) {
 
.tabs button {
  margin-left: -12px;
  background: none;
  border: none;
  padding: 6px 10px;
  gap: 4px;
  font-weight: 500;
   font-size: 1rem;
  color: #5c5a5a;
}
.tabs .active {
  color: rgb(53, 52, 58);
  border-bottom: 2px solid black;
}
.tabs button:hover {
  color: #0a0a0a;
}
}



</style>
