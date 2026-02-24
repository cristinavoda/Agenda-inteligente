<template>
   <div class="app">
    <AppHeader />
     
    <AppTabs v-model="activeTab" />

    <main class="content">
      <router-view />
    </main>
<Footer />
</div>
</template>

<script setup>

import { onMounted } from 'vue'
import { getPendingReminders, markAsFired } from './reminders/reminderEngine'
import { speak } from './pa/speechOutput'
import { ref } from 'vue'

import AppHeader from './components/ui/AppHeader.vue'
import AppTabs from './components/AppTabs.vue'
import Footer from './components/Footer.vue'

const activeTab = ref('Agenda')
const scheduled = new Set()

function scheduleReminder(reminder) {
  if (scheduled.has(reminder.id)) return
  scheduled.add(reminder.id)

  const timeout = reminder.notifyAt - Date.now()
  if (timeout <= 0) return

  setTimeout(() => {
    speak(`Recordatorio: ${reminder.title}`)

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('⏰ Recordatorio', {
        body: reminder.title,
        icon: '/icon.png'
      })
    }

    markAsFired(reminder.id)
  }, timeout)
}
onMounted(async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    console.log('Permiso de notificaciones:', permission)
  }

 
  getPendingReminders().forEach(scheduleReminder)

 
  window.addEventListener('reminder-added', (e) => {
    scheduleReminder(e.detail)
  })
})




  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log(' Service Worker registrado'))
        .catch(err => console.error(' SW error', err))
    })
  }
  





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