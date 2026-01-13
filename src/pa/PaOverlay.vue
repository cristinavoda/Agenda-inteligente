<template>
  <div class="overlay">
    <div class="card">
      <h3>🤖 Te escucho…</h3>
      <p>Habla ahora</p>

      <button @click="$emit('close')">Cerrar</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
   backdrop-filter: blur(6px);

  z-index: 9999; 
}

.card {
  background: transparent;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  width: 260px;
}
.pa-close {
  position: absolute;
  top: 12px;
  right: 12px;

  z-index: 10001;
  cursor: pointer;
}

</style>
