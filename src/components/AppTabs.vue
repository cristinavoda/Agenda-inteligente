<script setup>
import { useRouter, useRoute } from 'vue-router'
import PACapabilitiesDrawer from './ui/PACapabilitiesDrawer.vue'
const router = useRouter()
const route = useRoute()

const tabs = [
  { label: 'Agenda', path: '/agenda' },
  { label: 'Tareas', path: '/tasks' },
  { label: 'Compra', path: '/shopping' },
  { label: 'Notas', path: '/notes' }, 
  { label: '⌕', path: '/internet' },
   
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
    <PACapabilitiesDrawer />  
  </nav>




</template>

<style scoped>
.tabs {
  display: flex;
  justify-content: center;
  gap: 42px;
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

.tabs button.active {
  color: darkblue;
  border-bottom: 2px solid rgb(19, 17, 138);
  font-weight: 600;
}
.tabs button:hover {
  color: #2e1792a8;
}
@media (max-width: 750px) {
 .tabs {
  gap: 1px;
  margin-left: 19px;
 }
.tabs button {
  
  background: none;
  border: none;
  
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
