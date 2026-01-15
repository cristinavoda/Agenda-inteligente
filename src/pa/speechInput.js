let recognition = null

export function initSpeechRecognition(onResult) {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    console.warn('SpeechRecognition no soportado')
    return null
  }

  recognition = new SpeechRecognition()
  recognition.lang = 'es-ES'
  recognition.continuous = false
  recognition.interimResults = false

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.toLowerCase()
    onResult(text)
  }

  recognition.onerror = (e) => {
    console.error('🎤 Error reconocimiento:', e)
  }

  return recognition 
}

export function startListening() {
  if (!recognition) return
  try {
    recognition.start()
  } catch (e) {
    
  }
}

export function stopListening() {
  if (!recognition) return
  recognition.stop()
}
