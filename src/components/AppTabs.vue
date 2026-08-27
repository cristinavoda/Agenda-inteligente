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
  { label: 'Ajustes', path: '/settings' },
   
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
  flex-direction: column;
  justify-content: center;
  gap: 42px;
  margin-right: 0;
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
  color: #0c0c0ca8;
  transform: scale(1.3);
  font-weight: 700;
}

.tabs button.active {
   color: #f2f7f5; 
   background: linear-gradient(45deg, #1c1d1c, #fcf8f8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.5s ease;
  text-shadow: 1px solid black !important;
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(90deg, #616772, #f7f6f8, #363636) 1;
  font-family: Roboto slab;
  font-size: 1.2rem;
   font-weight: 600;
}

@media (max-width: 750px) {
 .tabs {
  gap: 1px;
  margin-right: 19px;
 }
.tabs button {
  
  background: none;
  border: none;
  
  font-weight: 6queda00;
  font-size: 18px;
  color: #302e2e;
}
.tabs .active {
  color: rgb(181, 180, 185);
  border-bottom: 2px solid rgb(139, 138, 148);
  font-family: Roboto slab;
  font-size: 17px;
}
.tabs button:hover {
  color: #48474b;
   transform: scale(1.2);

}

}

</style>
