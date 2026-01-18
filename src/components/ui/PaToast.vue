<template>
  <div class="pa-toast-wrapper">
    <transition-group name="toast" tag="div">
      <div
        v-for="m in store.messages"
        :key="m.id"
        class="pa-toast"
        :class="m.type"
      >
        ✓ {{ m.text }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { usePaFeedbackStore } from '../../stores/paFeedbackStore'
const store = usePaFeedbackStore()
</script>
<style scoped>
.pa-toast-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
}

.pa-toast {
  background: #1c1c1e;
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  margin-top: 8px;
  font-size: 0.9rem;
  box-shadow: 0 8px 20px rgba(0,0,0,.25);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.pa-toast.success {
  background: #4caf50;
}
.pa-toast.error {
  background: #f44336;
}
</style>