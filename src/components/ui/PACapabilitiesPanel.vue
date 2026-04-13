<template>
  <div>
    <button class="pa-button" @click="toggle">
      ⚡ Capacidades del PA
    </button>

    <div v-if="open" class="pa-panel">
      <h3> Agenda</h3>
      <p>abrir agenda</p>
      <p>añadir evento reunión mañana</p>
      <p>leer agenda</p>

      <h3>✅ Tareas</h3>
      <p>añadir tarea comprar leche</p>
      <p>borrar tarea uno</p>
      <p>borrar todas las tareas</p>

      <hr />

      <div class="tech">
        <h4>Arquitectura del PA</h4>
        <p>
          El PA interpreta lenguaje natural y lo transforma en acciones
          estructuradas mediante detección de intención (intent parsing).
        </p>
        <p>
          Las acciones se ejecutan bajo supervisión del usuario.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
const toggle = () => {
  open.value = !open.value
}
</script>

<style scoped>
.pa-button {
  background: #f0eeee;
  color: rgb(71, 69, 69);
  box-shadow: solid 3px 2px 3px rgb(12, 175, 187);

  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 70px;
}

.pa-panel {
  position: absolute;
  right: 20px;
  top: 60px;
  width: 320px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 2px 10px 30px rgba(0,0,0,0.1);
}

.tech {
  font-size: 0.85rem;
  opacity: 0.8;
}
</style>