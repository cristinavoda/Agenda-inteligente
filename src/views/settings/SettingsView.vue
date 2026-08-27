 <script setup>
 import { ref, computed } from 'vue'
 
import PASettings from '../../components/settings/PASettings.vue'
import PrivacySettings from '../../components/settings/PrivacySettings.vue'
import AppearanceSettings from '../../components/settings/AppearanceSettings.vue'

const current = ref('pa')

const currentComponent = computed(() => {
  switch (current.value) {
    case 'privacy':
      return PrivacySettings
    case 'appearance':
      return AppearanceSettings
    default:
      return PASettings
  }
})
</script>

<template>

<div class="settings-menu">

  <button @click="current='pa'">
     Personal Assistant
  </button>

  <button @click="current='privacy'">
     Privacidad
  </button>

  <button @click="current='appearance'">
     Apariencia
  </button>

</div>

<div class="settings-content">

  <component :is="currentComponent" />

</div>

</template>

<style scoped>

.settings-container{

    max-width:900px;

    margin:auto;

    padding:2rem;

    display:flex;

    flex-direction:column;

    gap:2.5rem;

}

.settings-menu {
   display:flex;

    flex-direction:row;

    gap:2.5rem;

    padding:2rem ;

}
</style>