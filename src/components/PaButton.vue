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
  box-shadow: 0 10px 25px rgba(13, 180, 166, 0.952);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pa-float-btn:hover {
  transform: scale(1.1);
   box-shadow: 0 15px 30px rgba(12, 125, 177, 0.938);
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
      0 0 0 0 bluecyan,
      0 10px 25px darkcyan;
  }
  70% {
    box-shadow:
      0 0 0 22px rgba(25, 104, 233, 0.959),
      0 10px 25px rgba(15, 106, 129, 0.945);
  }
  100% {
    box-shadow:
      0 0 0 0 rgba(59, 218, 246, 0.863),
      0 10px 25px rgba(7, 170, 219, 0.884);
  }
}

</style>