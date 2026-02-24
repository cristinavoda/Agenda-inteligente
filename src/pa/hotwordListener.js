// hotwordListener.js
import { paActive } from './paEngine'
import { stopListening } from './speechInput'

let recognition = null

export function initHotwordListener() {
  if (!('webkitSpeechRecognition' in window)) return

  recognition = new webkitSpeechRecognition()
  recognition.lang = 'es-ES'
  recognition.continuous = true
  recognition.interimResults = false

  recognition.onresult = (event) => {
    const text = event.results[event.results.length - 1][0].transcript.toLowerCase().trim()
    console.log('🔥 HOTWORD DETECTED:', text)
    if (['para', 'silencio', 'cállate', 'detente'].includes(text)) {
      console.log('💥 Deteniendo habla por hotword')
      window.speechSynthesis.cancel()
      if (paActive.value) stopListening()
    }
  }

  recognition.onerror = (e) => console.warn('Hotword mic error', e)

  recognition.start()
}