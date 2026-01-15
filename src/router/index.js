import { createRouter, createWebHistory } from 'vue-router'
import AgendaView from '../views/AgendaView.vue'

import TasksView from '../views/TasksView.vue'
import NotesView from '../views/NotesView.vue'
import ShoppingListView from '../views/ShoppingListView.vue'

const routes = [
   {
      path: '/',
      redirect: '/agenda'
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: AgendaView
    },
  
  { path: '/tasks', component: TasksView },
  { path: '/notes', component: NotesView },
  { path: '/shopping', component: ShoppingListView }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
