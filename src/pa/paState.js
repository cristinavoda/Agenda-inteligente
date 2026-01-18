// src/pa/paState.js
import { ref } from 'vue'

export const paState = ref('idle')

export function setPAState(value) {
  paState.value = value
}
