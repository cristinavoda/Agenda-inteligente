<template>
  <div>
   
    <button class="pa-trigger" @click="open = true">
        i
    </button>

   
    <transition name="fade">
      <div v-if="open" class="overlay" @click="open = false"></div>
    </transition>

    
    <transition name="slide">
      <aside v-if="open" class="drawer">
        <div class="drawer-header">
          <h2>Capacidades del Asistente Inteligente</h2>
          <button class="close" @click="open = false">✕</button>
        </div>
<div class="section">
       <hr />
      <div class="importante"> Activar el Asistente Inteligente.</div> <hr /> Es como tener un asistente personal que entiende tus necesidades y te ayuda a gestionar tu día a día de manera eficiente. Aquí tienes una guía rápida para aprovechar al máximo sus capacidades:abre,leer,añadir,borrar,buscar + (agenda, tareas, notas, lista) + detalles opcionales.
        


  <pre>
    Cómo usar el Asistente Inteligente
Para que el asistente ejecute una acción, debes comenzar el comando con una palabra clave exacta.
Las palabras reconocidas son:

ABRIR · LEER · AÑADIR · BORRAR · BUSCAR

Después puedes indicar la sección o el contenido.
    Acción + Sección + Detalles opcionales

</pre>
<hr />

  <pre>
    COMANDOS PRINCIPALES

ABRIR: agenda, calendario, tareas, notas, lista
LEER: agenda, tareas, notas, lista
AÑADIR: evento, tarea, nota, artículo
BORRAR: nota, tarea, artículo
BUSCAR: información, receta, definición
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
  border: 1px 2px solid #4b5050;
  margin-right: 70px;
  padding: 16px 72px;
  border: none;
  border-bottom: 2px solid #4b5050;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pa-trigger:hover {
  background: #7d86d3;
 
}
.importante {
  background: #f1f3f1;
  color: darkblue;
   font-weight: 800;
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
  border: 1px 3px rgb(51, 51, 54);
  font-size: 1rem;
  cursor: pointer;
  color: darkblue;
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

@media (max-width: 750px) {
  .drawer {
    width: 90%;
  }
}
.pa-trigger {
  background: transparent;
  border: 1px 2px solid #919494;
  margin-right: 75px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pa-trigger:hover {
  background: #f5f5f5;
}

</style>