<template>

<header class="app-header">

    <button
      class="icon-btn"
      @click="emit('toggle-sidebar')"
    >
      <Menu :size="22" />
    </button>

    <h1></h1>

    <div class="header-actions">

      <button
        class="icon-btn"
        @click="togglePA()"
      >
        <Bot :size="22" />
      </button>

      <button
        class="icon-btn"
        @click="emit('lock')"
      >
        <Lock :size="22" />
      </button>

    </div>

</header>

</template>

<script setup>
import { Menu, Bot, Lock } from '@lucide/vue'
import {
  paActive,
  activatePA,
  deactivatePA
} from '../../pa/paEngine'

function togglePA(){
 console.log("Antes:", paActive.value)
    paActive.value
        ? deactivatePA()
        : activatePA()

    if(navigator.vibrate){
        navigator.vibrate(50)
    }

}
const emit = defineEmits([
  'toggle-sidebar',
  'toggle-pa',
  'lock'
])
</script>

<style scoped>
.app-header{

    height:64px;

    display:flex;

    align-items:center;

    justify-content:space-between;

    padding:0 1rem;

    background:#f7f8fa;

    border-bottom:1px solid #e5e5ea;

}

.app-header h1{

    margin:0;

    font-family:'Roboto Slab', serif;

    font-size:1.35rem;

    color:#70757d;

    flex:1;

    text-align:center;

}

.header-actions{

    display:flex;

    gap:.5rem;

}

.icon-btn{

    all:unset;

    width:38px;

    height:38px;

    display:flex;

    justify-content:center;

    align-items:center;

    cursor:pointer;

    border-radius:10px;

    transition:.2s;
    
    animation:pulse 1.5s infinite;
    
    transform:scale(1.08);

}

.icon-btn:hover{

    background:#eceff2;

}

</style>  