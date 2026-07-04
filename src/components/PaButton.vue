<template>
  <button
  class="pa-float-btn"
  :class="{ active: paActive }"
  @click="togglePA"
  aria-label="Asistente de voz"
>AI</button>


</template>

<script setup>
import { paActive, activatePA, deactivatePA } from '../../pa/paEngine'

function togglePA() {
  paActive.value ? deactivatePA() : activatePA()
  if (navigator.vibrate) navigator.vibrate(50)

}
</script>

<style >
.pa-float-btn {
  position: fixed;
  right: 144px;
  margin-top: 135px;
  width: 26px;
  height: 26px;
  border-radius: 12px;
  background: rgba(255,255,255,0.9);
  font-size: 1.5rem;
  color: rgb(94, 94, 97);
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 5px rgba(223, 224, 226, 0.952);
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pa-float-btn:hover {
  transform: scale(1.1);
   box-shadow: 0 15px 30px rgba(120, 127, 224, 0.938);
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
      0 10px 5px rgb(193, 197, 231);
  }
  10% {
    box-shadow:
      0 0 0 2px rgba(58, 59, 61, 0.959),
      0 10px 5px rgba(233, 233, 247, 0.945);
  }
  20% {
    box-shadow:
      0 0 0 0 rgba(157, 166, 182, 0.863),
      0 10px 5px rgba(231, 233, 238, 0.884);
  }
}
@media (max-width: 750px) {
 .pa-float-btn {
  margin-top: -10px ;
 } 
}
</style>