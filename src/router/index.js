import { createRouter, createWebHistory } from 'vue-router'

import { auth } from '../firebase'
import { subscribeAuth } from '../services/auth'

import LoginForm from '../components/LoginForm.vue'
import AgendaView from '../views/AgendaView.vue'
import InternetView from '../views/InternetView.vue'
import TasksView from '../views/TasksView.vue'
import NotesView from '../views/NotesView.vue'
import ShoppingListView from '../views/ShoppingListView.vue'
import SettingsView from '../views/settings/SettingsView.vue'
import PlanificacionDiaria from '../views/PlanificacionDiaria.vue'
const routes = [
   {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: AgendaView
  },
  { path: '/internet', component: InternetView },
  { path: '/tasks', component: TasksView },
  { path: '/notes', component: NotesView },
  { path: '/shopping', component: ShoppingListView },
  { path: '/settings', component: SettingsView },
  { path: '/planificacion-diaria', component: PlanificacionDiaria }
]

export const router = createRouter({
  
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const user = auth.currentUser

  
  if (to.name !== 'login' && !user) {
    return { name: 'login' }
  }

  
  if (to.name === 'login' && user) {
    return { name: 'agenda' }
  }
})

let authReady = false

let resolveAuthReady

const authReadyPromise = new Promise((resolve) => {
  resolveAuthReady = resolve
})

subscribeAuth(() => {
  if (!authReady) {
    authReady = true
    resolveAuthReady()
  }
})

router.beforeEach(async (to) => {
  
  if (!authReady) {
    await authReadyPromise
  }

  const isAuthenticated = !!auth.currentUser

 
  if (to.name !== 'login' && !isAuthenticated) {
    return { name: 'login' }
  }

  // Con sesión activa, no es necesario mostrar el login
  if (to.name === 'login' && isAuthenticated) {
    return { name: 'agenda' }
  }
})
