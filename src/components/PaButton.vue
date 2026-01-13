<template>
  <button class="pa-float-btn" @click="togglePA">
    🤖 {{ paActive ? 'Escuchando' : 'Activar PA' }}
  </button>
</template>

<script setup>
import { paActive, activatePA, deactivatePA } from '../pa/paEngine'

function togglePA() {
  paActive.value ? deactivatePA() : activatePA()
}
</script>

<style scoped>
.pa-float-btn {
  position: fixed;
  right: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  color: none;
  font-size: 14px;
  border: none;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  transition: transform 0.2s;
}

.pa-float-btn:hover {
  transform: scale(1.5);
}

.pa-float-btn.active {
  animation: halo 1.5s infinite;
}

@keyframes halo {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 13, 150, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

.pa-status {
  position: fixed;
  bottom: 20px;
  right: 30px;
  background: transparent;
  color: rgb(36, 34, 37);
  padding: 10px 10px;
  border-radius: 10px;
  font-weight: 200;
  font-size: 1.5rem;
  
}
</style>





