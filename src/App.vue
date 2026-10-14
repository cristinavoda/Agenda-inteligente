<template>

  <LoadingScreen v-if="loading" />

  <LoginForm v-else-if="!user" />

  <div v-else class="app">
 
    <AppHeader
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @toggle-pa="assistantOpen = !assistantOpen"
      @lock="isLocked = true"
    />

   
    <div
      v-if="sidebarOpen"
      class="overlay">
    </div>

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
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { saveDeviceToken } from './services/deviceTokens'
import { registerPushNotifications } from './services/pushNotifications'
import { getPendingReminders, markAsFired } from './reminders/reminderEngine'
import { speak } from './pa/speechOutput'
import AppHeader from './components/ui/AppHeader.vue'
import Footer from './components/Footer.vue'
import { user } from "./stores/user";
import { subscribeAuth } from "./services/auth";
import LoginForm from "./components/LoginForm.vue";
import { useRouter } from 'vue-router'
import LockScreen from './components/LockScreen.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import { Lock } from '@lucide/vue'
import AppSidebar from './components/AppSidebar.vue'
import { logout } from './services/auth'

const router = useRouter()
const sidebarOpen = ref(false)
const isLocked = ref(false);

async function handleLogout() {
  try {
    await logout()

    isLocked.value = false
    user.value = null
    localStorage.removeItem('user')

    await router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

function lockApp() {
  emit('lock')
}

const loading = ref(true);



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


let unsubscribeAuth

onMounted(() => {
  unsubscribeAuth = subscribeAuth(async (u) => {
    user.value = u
    loading.value = false

    if (!u) {
      console.log('No hay usuario autenticado')
      return
    }

    console.log('Usuario autenticado:', u.uid)

    const token = await registerPushNotifications()

    if (!token) {
      console.warn('No se ha obtenido el token FCM')
      return
    }

    try {
      await saveDeviceToken(u.uid, token)
      console.log('Dispositivo registrado para FCM')
    } catch (error) {
      console.error('Error al guardar el token:', error)
    }
  })
})


function handleReminderAdded(event) {
  scheduleReminder(event.detail)
}

onMounted(() => {
  // 1. Recuperar y programar los recordatorios pendientes
  getPendingReminders().forEach(scheduleReminder)

  // 2. Escuchar los nuevos recordatorios que se guarden
  window.addEventListener('reminder-added', handleReminderAdded)
})


onBeforeUnmount(() => {
  unsubscribeAuth?.()
   window.removeEventListener('reminder-added', handleReminderAdded)
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