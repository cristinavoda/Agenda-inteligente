<template>
  <aside
    class="sidebar"
    :class="{ open: props.open }"
  >
    <!-- Cabecera -->
    <div class="sidebar-header">
      <div class="sidebar-brand">
        <span class="brand-mark">A</span>

        <div class="brand-text">
          <span class="brand-name">Agenda</span>
          <span class="brand-subtitle">Inteligente</span>
        </div>
      </div>

     
      <button
        class="close-btn"
        type="button"
        aria-label="Cerrar menú"
        @click="emit('close')"
      >
        <X :size="20" />
      </button>
    </div>

    
    <nav
      class="sidebar-nav"
      aria-label="Navegación principal"
    >
      <button
        v-for="tab in tabs"
        :key="tab.path"
        type="button"
        class="nav-btn"
        :class="{ active: route.path === tab.path }"
        @click="navigate(tab.path)"
      >
        <component
          :is="tab.icon"
          :size="18"
          :stroke-width="1.7"
        />

        <span>{{ tab.label }}</span>
      </button>
    </nav>

  
    <div class="sidebar-footer">
      <span>Agenda Personal</span>
    </div>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

import {
  CalendarDays,
  SquareCheckBig,
  ShoppingCart,
  NotebookPen,
  Search,
  Settings,
  X
} from '@lucide/vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
})


const emit = defineEmits(['close'])

const navigate = (path) => {
  router.push(path)
  emit('close')
}
const tabs = [
  {
    label: 'Agenda',
    icon: CalendarDays,
    path: '/agenda'
  },
  {
    label: 'Tareas',
    icon: SquareCheckBig,
    path: '/tasks'
  },
  {
    label: 'Compra',
    icon: ShoppingCart,
    path: '/shopping'
  },
  {
    label: 'Notas',
    icon: NotebookPen,
    path: '/notes'
  },
  {
    label: 'Internet',
    icon: Search,
    path: '/internet'
  },
  {
    label: 'Ajustes',
    icon: Settings,
    path: '/settings'
  }
]
</script>

<style scoped>

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgb(241, 241, 233);
  width: 100%;
  height: 100%;

  transform: translateX(100%);

  transition: transform 0.28s ease;

  z-index: 1000;
}

.sidebar.open {
  transform: translateX(0);
}
.sidebar-header {
  min-height: 82px;

  display: flex;
  align-items: center;
  
  justify-content: space-between;

  padding: 0 22px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}

.sidebar-brand {
  display: flex;
  justify-content: flex-end;
  gap: 11px;
}

.brand-mark {
  width: 30px;
  height: 30px;

  display: grid;
  place-items: center;

  font-family: Georgia, serif;
  font-size: 17px;

  border: 1px solid currentColor;
  border-radius: 50%;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.brand-name {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.brand-subtitle {
  margin-top: 4px;

  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  opacity: 0.55;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  background: transparent;

  padding: 7px;

  cursor: pointer;

  opacity: 0.65;

  transition: opacity 0.18s ease;
}

.close-btn:hover {
  opacity: 1;
}


.close-btn:hover {
  opacity: 1;
}



.sidebar-nav {
  display: flex;
  flex-direction: column;
  right: 10px;
  gap: 4px;

  padding: 28px 14px;
}

.nav-btn {
  width: 100%;

  display: flex;
  
   
 justify-content: flex-end;
  gap: 14px;

  padding: 12px 12px;

  border: 0;
  border-radius: 7px;

  background: transparent;

  color: inherit;

  font: inherit;
  font-size: 14px;

  text-align: left;

  cursor: pointer;

  transition:
    background 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.nav-btn svg {
  flex-shrink: 0;
  opacity: 0.65;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.045);
}

.nav-btn:active {
  transform: translateX(1px);
}
.nav-btn.active {
  position: relative;

  color: #111111;
  font-weight: 800;
  font-size: larger;

  border-radius: 0;
}

.nav-btn.active svg {
  opacity: 1;
}
.nav-btn.active::after {
  content: '';

  position: absolute;
  right: 12px;
  bottom: 5px;

  width: 102px;
  height: 1px;

  background: #111111;
}


.sidebar-footer {
  bottom: 0;

  padding: 18px 22px;

  border-top: 1px solid rgba(0, 0, 0, 0.07);

  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  opacity: 0.45;
}



@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    left: auto;
    right: 0;

    transform: translateX(100%);

    border-right: 0;
    border-left: 0;

    box-shadow: none;
  }

  .sidebar.open {
    transform: translateX(0);

    box-shadow: -10px 0 35px rgba(0, 0, 0, 0.08);
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
     padding: 24px 38px;
  }

  .sidebar-header {
    min-height: 72px;
    padding: 0 20px;
  }

  .sidebar-nav {
    padding: 24px 38px;
    gap: 5px;
  }

  .nav-btn {
   
   

    padding: 15px 14px;
    font-size: 15px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .nav-btn svg {
    width: 20px;
    height: 20px;
  }
 
}
</style>