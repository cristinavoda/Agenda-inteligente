<template>
  <button
  class="pa-float-btn"
  :class="{ active: paActive }"
  @click="togglePA"
  aria-label="Asistente de voz"
>AI</button>


</template>

<script setup>
import { paActive, activatePA, deactivatePA } from '../pa/paEngine'

function togglePA() {
  paActive.value ? deactivatePA() : activatePA()
  if (navigator.vibrate) navigator.vibrate(50)

}
</script>

<style >
.pa-float-btn {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 26px;
  height: 26px;
  border-radius: 12px;
  background: rgba(255,255,255,0.9);
  font-size: 1.5rem;
  color: rgb(44, 44, 233);
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(223, 224, 226, 0.952);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pa-float-btn:hover {
  transform: scale(1.1);
   box-shadow: 0 15px 30px rgba(53, 65, 231, 0.938);
}

.pa-float-btn.active {
  animation: halo 1s infinite;
}
@keyframes float {
  0%, 10% { transform: translateY(0); }
  10% { transform: translateY(-6px); }
}

.pa-float-btn img {
  animation: float 3s ease-in-out infinite;
}

@keyframes halo {
  0% {
    box-shadow:
      0 0 0 0 bluecyan,
      0 10px 5px rgb(90, 106, 243);
  }
  10% {
    box-shadow:
      0 0 0 2px rgba(25, 104, 233, 0.959),
      0 10px 5px rgba(42, 45, 233, 0.945);
  }
  20% {
    box-shadow:
      0 0 0 0 rgba(59, 125, 246, 0.863),
      0 10px 5px rgba(46, 107, 240, 0.884);
  }
}

</style>