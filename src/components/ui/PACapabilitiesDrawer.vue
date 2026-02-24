<template>
  <div>
    <!-- Botón -->
    <button class="pa-trigger" @click="open = true">
        PA
    </button>

    <!-- Overlay -->
    <transition name="fade">
      <div v-if="open" class="overlay" @click="open = false"></div>
    </transition>

    <!-- Drawer -->
    <transition name="slide">
      <aside v-if="open" class="drawer">
        <div class="drawer-header">
          <h2>Capacidades del PA</h2>
          <button class="close" @click="open = false">✕</button>
        </div>
<div class="section">
       <hr />
  <h3>Comandos rápidos</h3>
  <pre>
Abrir: agenda, calendario, tareas, notas, lista
Leer: agenda, tareas, notas, lista
Añadir: evento, tarea, nota, artículo
Borrar: nota, tarea, artículo
  </pre>

<hr />

</div>
        <div class="section">
          <h3>Agenda</h3>
          <p>abrir agenda</p>
          <p>añadir evento reunión mañana</p>
          <p>leer agenda</p>
        </div>

        <div class="section">
          <h3>Tareas</h3>
          <p>añadir tarea comprar leche</p>
          <p>borrar tarea uno</p>
          <p>borrar todas las tareas</p>
        </div>

        <div class="section">
          <h3>Notas</h3>
          <p>añadir nota idea proyecto</p>
          <p>borrar nota dos</p>
        </div>

        <div class="section">
          <h3>Buscar</h3>
          <p>buscar receta hummus</p>
          <p>qué es React</p>
        </div>

        <hr />

        <div class="architecture">
          <h4>Arquitectura</h4>
          <p>
            El PA interpreta lenguaje natural y lo transforma en acciones
            estructuradas mediante detección de intención (intent parsing).
          </p>
          <p>
            Todas las acciones requieren supervisión del usuario.
          </p>
        </div>
<hr />

      </aside>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

<style scoped>
.pa-trigger {
  background: transparent;
  border: 1px solid #ddd;
  margin-right: 90px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pa-trigger:hover {
  background: #f5f5f5;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
    
   
}

.drawer {
  position: fixed;
  top: 0px;
  right: 0;
  width: 360px;
  height: 100%;
  background: white;
  padding: 24px;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
  z-index: 1000;
  
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section {
  margin-bottom: 24px;
}

.section h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.section p {
  font-size: 0.9rem;
  margin: 4px 0;
  color: #444;
}

.architecture {
  font-size: 0.8rem;
  color: #666;
}

.close {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}


.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
</style>