<template>

<aside
  class="sidebar"
  :class="{ open: props.open }"
>

  <button
    v-for="tab in tabs"
    :key="tab.path"
    class="nav-btn"
    :class="{ active: route.path === tab.path }"
    @click="router.push(tab.path)"
  >

    <component
      :is="tab.icon"
      :size="18"
    />

    <span>
      {{ tab.label }}
    </span>

  </button>

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
  Settings 

  
} from '@lucide/vue'

const router = useRouter()
const route = useRoute()
const props = defineProps({
  open: Boolean
})

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
    left: -260px;
    top: 74px;      
    width: 160px;
    height: calc(100vh - 74px);

    transition: left .3s ease;
     opacity: 1;
  z-index: 1000;
    background: #f7f3f3;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}
.sidebar.open {
    left: 3px;
}
.nav-btn{

    all:unset;

    display:flex;

    align-items:center;

    gap:12px;

    padding:12px;

    cursor:pointer;

    background:transparent;

    font-family:Inter,sans-serif;

    transition:.2s;

}

.nav-btn:hover{

    background:#eceff2;

}

.active{

    background:#dfe4ea;
width: 132px;
    font-weight:600;
    border-left:4px solid #4e4f50;

}
</style>