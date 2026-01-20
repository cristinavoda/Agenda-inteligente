<template>
  <button
  class="pa-float-btn"
  :class="{ active: paActive }"
  @click="togglePA"
  aria-label="Asistente de voz"
>
  <img src="/icons/robot.png" alt="Asistente" />
</button>

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
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  font-size: 24px;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(245, 243, 243, 0.952);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pa-float-btn:hover {
  transform: scale(1.1);
   box-shadow: 0 15px 30px rgba(68, 53, 204, 0.938);
}

.pa-float-btn.active {
  animation: halo 1.6s infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.pa-float-btn img {
  animation: float 3s ease-in-out infinite;
}

@keyframes halo {
  0% {
    box-shadow:
      0 0 0 0 rgba(59, 130, 246, 0.6),
      0 10px 25px rgba(0,0,0,0.25);
  }
  70% {
    box-shadow:
      0 0 0 22px rgba(59, 130, 246, 0),
      0 10px 25px rgba(0,0,0,0.25);
  }
  100% {
    box-shadow:
      0 0 0 0 rgba(59, 130, 246, 0),
      0 10px 25px rgba(0,0,0,0.25);
  }
}

</style>