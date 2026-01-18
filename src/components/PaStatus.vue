<template>
  <div class="pa-status" :class="state">
    <span v-if="state === 'listening'">🟢 PA escuchando</span>
    <span v-else-if="state === 'processing'">🔵 PA ejecutando</span>
    <span v-else>⚪ PA en reposo</span>
  </div>
</template>

<script setup>
import { paState } from '../pa/paState.js'
const state = paState
</script>
