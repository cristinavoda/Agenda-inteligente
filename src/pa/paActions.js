import { router } from '../router'
import { useCalendarStore } from '../stores/calendarStore'
import { useTasksStore } from '../stores/tasksStore'
import { useNotesStore } from '../stores/notesStore'
import { useShoppingStore } from '../stores/shoppingStore'
import { speak } from './speechOutput'

export function executeIntent(intentObj) {
  if (!intentObj) return

  const { intent, payload } = intentObj

  switch (intent) {
    
    case 'OPEN_AGENDA':
  router.push('/agenda')
  speak('Abriendo agenda')
  break
  
    case 'OPEN_CALENDAR':
      router.push('/calendar')
      break

    case 'OPEN_TASKS':
      router.push('/tasks')
      break

    case 'OPEN_NOTES':
      router.push('/notes')
      break

    case 'OPEN_SHOPPING_LIST':
      router.push('/shopping')
      break

    
    case 'ADD_EVENT': {
      const calendarStore = useCalendarStore()
      calendarStore.addEvent(payload)
      speak(`Evento ${payload.title} añadido a las ${payload.time}`)
      break
    }

    case 'ADD_TASK': {
      const taskStore = useTaskStore()
      taskStore.addTask(payload)
      speak(`Tarea ${payload.title} añadida`)
      break
    }

    case 'ADD_NOTE': {
      const notesStore = useNotesStore()
      notesStore.addNote(payload)
      speak(`Nota añadida`)
      break
    }

    case 'ADD_SHOPPING_ITEM': {
      const shoppingStore = useShoppingStore()
      shoppingStore.addItem(payload)
      speak(`Artículo ${payload.name} añadido a la lista`)
      break
    }

    
   case 'READ_AGENDA': {
  const calendarStore = useCalendarStore()
  const today = new Date().toISOString().slice(0, 10) 

  
  const eventsToday = calendarStore.events
    .filter(e => e.date === today)
    .map(e => ({ ...e })) 

  if (!eventsToday.length) {
    speak('No tienes eventos para hoy')
    break
  }

 
  const text = eventsToday
    .map(e => `A las ${e.time}: ${e.title}`)
    .join('. ')

  speak(`Hoy tienes ${eventsToday.length} ${eventsToday.length > 1 ? 'eventos' : 'evento'}. ${text}`)
  break
}
case 'READ_TASKS': {
  const taskStore = useTaskStore()
  const today = new Date().toISOString().slice(0, 10) 

 
  const tasksToday = taskStore.tasks
    .filter(t => t.date === today) // asegúrate de que cada tarea tenga campo `date`
    .map(t => ({ ...t }))          // Proxy → array plano

  if (!tasksToday.length) {
    speak('No tienes tareas para hoy')
    break
  }

  // Texto natural: "A las 15:10: Reunir con cliente"
  const text = tasksToday
    .map(t => `A las ${t.time}: ${t.title}`)
    .join('. ')

  const plural = tasksToday.length > 1 ? 'tareas' : 'tarea'
  speak(`Hoy tienes ${tasksToday.length} ${plural}. ${text}`)
  break
}

case 'READ_NOTES': {
  const notesStore = useNotesStore()
  if (!notesStore.notes.length) {
    speak('No tienes notas')
    break
  }

  // Tomamos solo las 5 notas más recientes
  const recentNotes = notesStore.notes
    .slice(-10)  // últimas 5
    .map(n => ({ ...n })) // Proxy → array plano

  const text = recentNotes.map(n => n.content).join('. ')
  const plural = recentNotes.length > 1 ? 'notas' : 'nota'
  speak(`Tienes ${recentNotes.length} ${plural} recientes. ${text}`)
  break
}

 case 'READ_SHOPPING_LIST': {
  const shoppingStore = useShoppingStore()

  if (!shoppingStore.items.length) {
    speak('La lista de la compra está vacía')
    break
  }

  // Tomamos los últimos 5 artículos y convertimos a array plano
  const recentItems = shoppingStore.items
    .slice(-25)
    .map(i => i.name) // aquí solo nombres, ya es string plano

  // Texto natural con pausas
  const text = recentItems.join('. ') // punto + espacio = pausa clara

  const plural = recentItems.length > 1 ? 'artículos' : 'artículo'
  speak(`Tienes ${recentItems.length} ${plural} en la lista de la compra. ${text}`)
  break
}

case 'DELETE_LAST_NOTE': {
      const notesStore = useNotesStore()
      if (!notesStore.notes.length) {
        speak('No hay notas para borrar')
        return
      }
      notesStore.removeNote(notesStore.notes[0].id)
      speak('Última nota eliminada')
      break
    }

    case 'DELETE_LAST_TASK': {
      const tasksStore = useTasksStore()
      if (!tasksStore.tasks.length) {
        speak('No hay tareas para borrar')
        return
      }
      tasksStore.removeTask(tasksStore.tasks.at(-1).id)
      speak('Última tarea eliminada')
      break
    }

    case 'DELETE_LAST_SHOPPING': {
      const shoppingStore = useShoppingStore()
      if (!shoppingStore.items.length) {
        speak('La lista de la compra está vacía')
        return
      }
      shoppingStore.removeItem(shoppingStore.items[0].id)
      speak('Último producto eliminado')
      break
    }

    default:
      speak('Intent no reconocido')
  }
}
