<template>
  <header class="header">
    <h1>Agenda Inteligente</h1>
 <PaButton />
  </header>
</template>
<script setup>
import PaButton from '../PaButton.vue'
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #eaeaea;
  background: white;
}

h1 {
  font-size: 20px;
  font-weight: 600;
  color: rgb(14, 14, 143);
}

.pa-float-btn {
  position: fixed;
  top: 10px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: transparent;
  color: white;
  font-size: 28px;
  border: none;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  transition: transform 0.2s;
}

.pa-float-btn:hover {
  transform: scale(1.5);
}

.pa-float-btn.active {
  animation: halo 1.5s infinite;
}

@keyframes halo {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 13, 150, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

.pa-status {
  position: fixed;
  bottom: 20px;
  right: 30px;
  background: transparent;
  color: rgb(105, 102, 102);
  padding: 10px 15px;
  border-radius: 10px;
  
  font-weight: 200;
  font-size: 1.rem;
  
}
@media (max-width: 750px) {
 
.h1 {
  font-size: 1rem;
  font-weight: 500;
}

}
</style>
