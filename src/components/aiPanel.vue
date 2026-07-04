<template>
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
</template>
<script setup>
import { ref } from 'vue'   

import { useAIStore } from '../../stores/aiStore'   
const aiStore = useAIStore()
const message = ref('')

function send() {
  if (!message.value.trim()) return
  aiStore.sendMessage(message.value)
  message.value = ''
}
</script>