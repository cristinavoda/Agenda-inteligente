<template>

  <div v-if="loading">
    Cargando...
  </div>

  <LoginForm v-else-if="!user" />

  <div v-else class="app">

    <AppHeader
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @toggle-pa="assistantOpen = !assistantOpen"
      @lock="isLocked = true"
    />

   
    <div
      v-if="sidebarOpen"
      class="overlay"
      @click="sidebarOpen = false"
    ></div>

    <AppSidebar
      :open="sidebarOpen"
      @close="sidebarOpen = false"
    />

    <LockScreen
      v-if="isLocked"
      @unlock="isLocked = false"
      @logout="handleLogout"
    />

    <main
      v-else
      class="content"
    >
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
import { user } from "./stores/user";
import { subscribeAuth } from "./services/auth";
import LoginForm from "./components/LoginForm.vue";
import { useRouter } from 'vue-router'
import LockScreen from './components/LockScreen.vue'
import { Lock } from '@lucide/vue'
import AppSidebar from './components/AppSidebar.vue'
const sidebarOpen = ref(false)
const isLocked = ref(false);

function handleLogout() {
  isLocked.value = false

  user.value = null;
  localStorage.removeItem('user');
  router.push('/login');
}

function lockApp() {
  emit('lock')
}

const loading = ref(true);


onMounted(() => {
  subscribeAuth((u) => {
    user.value = u;
      loading.value = false;
  });
});

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
.layout{

    display:flex;

}
.overlay{

    position:fixed;

    inset:0;

    background:rgba(0,0,0,.12);

    backdrop-filter:blur(2px);

}
@media (max-width: 750px) {
  .app {
    width: 100%;
  }
}
</style>