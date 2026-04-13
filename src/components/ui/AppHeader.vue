<template>
  <header class="header">
    <h1>Agenda Inteligente</h1>

 <PaButton />

    <div class="right">
      <PACapabilitiesDrawer />
    </div>
 <!--
<div class="ai-panel">
  <input
    v-model="message"
    @keyup.enter="send"
    placeholder="Pregúntame algo..."
  />
  <button @click="send">IA</button>
</div>

<div v-if="aiStore.loading" class="ai-response loading">
  Pensando...
</div>

<div v-if="aiStore.lastResponse" class="ai-response">
  {{ aiStore.lastResponse }}
</div>
-->
  </header>
</template>


<script setup>

import PaButton from '../PaButton.vue'
import { ref } from 'vue'
import { useAIStore } from '../../stores/aiStore'  
import PACapabilitiesDrawer from '../ui/PACapabilitiesDrawer.vue'
const aiStore = useAIStore()

const message = ref('')

function send() {
  if (!message.value.trim()) return
  aiStore.sendMessage(message.value)
  message.value = ''
}
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 18px;
  border-bottom: 1px solid #eaeaea;
  background: white;
  gap: 2rem;
}

h1 {
  font-size: 20px;
  font-weight: 600;
  color: rgb(14, 14, 143);
}

.pa-float-btn {
  position: fixed;
  top: 20px;
  right: 45px;

  width: 48px;
  height: 48px;

  border-radius: 50%;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.2rem;

  background: linear-gradient(135deg, #e7eaf0, #6c6eee);
  color: white;

  cursor: pointer;

  box-shadow: 0 8px 25px rgba(59,130,246,0.4);

  transition: all 0.25s ease;
}


.pa-float-btn:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 2px 5px rgba(99,102,241,0.6);
}
.pa-float-btn:hover {
  transform: scale(1.1);
}

.pa-float-btn.active {
  animation: halo 1.5s infinite;
}
.pa-float-btn::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;

  background: rgba(99,102,241,0.4);
  z-index: -1;

  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  70% {
    transform: scale(1.1);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
@keyframes halo {
  0% {
    box-shadow: 0 0 0 0 rgba(84, 69, 221, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(200, 201, 206, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(249, 248, 250, 0.979);
  }
}

.pa-status {
  position: fixed;
  bottom: 20px;
  right: 30px;
  background: transparent;
  color: rgb(105, 102, 102);
  padding: 10px 15px;
  border: none;
  
  font-weight: 200;
  font-size: 1rem;
  
}
@media (max-width: 750px) {
 
.h1 {
  font-size: 1rem;
  font-weight: 500;
}

}
</style>
