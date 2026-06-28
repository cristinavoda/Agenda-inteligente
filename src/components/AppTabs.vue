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

<style >
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

.tabs button:hover {
  color: #2e0bcea8;
}
.tabs button.active {
  color: rgb(22, 22, 165) !important;
   border-bottom: 3px solid transparent;
  border-image: linear-gradient(90deg, #2563eb, #9333ea, #48ecd1) 1;
  font-family: Roboto slab;
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
  font-size: 17px;
  color: #302e2e;
}
.tabs .active {
  color: rgb(50, 22, 189);
  border-bottom: 2px solid rgb(23, 11, 190);
  font-family: Roboto slab;
}
.tabs button:hover {
  color: #3408d1;
}
}



</style>
