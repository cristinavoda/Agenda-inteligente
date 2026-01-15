<template>
   <div class="app">
    <AppHeader />
    <AppTabs v-model="activeTab" />

    <main class="content">
      <router-view />
    </main>

</div>
</template>

<script setup>

import { onMounted } from 'vue'
import { getPendingReminders, markAsFired } from './reminders/reminderEngine'
import { speak } from './pa/speechOutput'
import { ref } from 'vue'

import AppHeader from './components/ui/AppHeader.vue'
import AppTabs from './components/AppTabs.vue'

const activeTab = ref('Agenda')

function scheduleReminder(reminder) {
  const timeout = reminder.notifyAt - Date.now()
  if (timeout <= 0) return

  setTimeout(() => {
    
    speak(`Recordatorio: ${reminder.title}`)

   
    if (Notification.permission === 'granted') {
      new Notification(' Recordatorio', {
        body: reminder.title,
        icon: '/icon.png'
      })
    }

   
    markAsFired(reminder.id)
  }, timeout)
}


onMounted(() => {
 
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      console.log('Permiso de notificaciones:', permission)
    })
  }

 getPendingReminders().forEach(reminder => {
  if (!reminder) return
  scheduleReminder(reminder)
})

 
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log(' Service Worker registrado'))
        .catch(err => console.error(' SW error', err))
    })
  }
  
})
</script>
<style>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #fafafa;
}
</style>