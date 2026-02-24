import { ref } from 'vue'
import { initSpeechRecognition, startListening, stopListening } from './speechInput'
import { parseIntent } from './intentParser'
import { executeIntent } from './paActions'
import { speak } from './speechOutput'
import { handleAIResponse } from './paAI'

  import { initHotwordListener } from './hotwordListener'

export const paActive = ref(false)
let recognition = null


export function activatePA() {
  if (paActive.value) return
  paActive.value = true
initHotwordListener

  recognition = initSpeechRecognition(async (text) => {
    stopListening()
    console.log('TEXTO:', text)

   const result = parseIntent(text)

if (!result || result.intent === 'UNKNOWN') {
  console.log('Intent no reconocido:', text)
  
  return
}

executeIntent(result)
  })

  recognition.onend = () => {
    if (paActive.value) setTimeout(() => startListening(), 600)
  }

  speak('Te escucho')
  startListening()
}

export function deactivatePA() {
  paActive.value = false
  stopListening()
  speak('Asistente desactivado')
}