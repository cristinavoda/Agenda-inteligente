import { router } from '../router'
import { useCalendarStore } from '../stores/calendarStore'
import { useTasksStore } from '../stores/tasksStore'
import { useNotesStore } from '../stores/notesStore'
import { useShoppingStore } from '../stores/shoppingStore'
import { usePaFeedbackStore } from '../stores/paFeedbackStore'
import { speak } from './speechOutput'

export function executeIntent(intentObj) {
  if (!intentObj) return

  const { intent, payload } = intentObj
  console.log('🎯 EXEC INTENT:', intent, payload)

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
       usePaFeedbackStore().show(
    `Evento añadido: ${payload.title}`
  )
      speak(`Evento ${payload.title} añadido a las ${payload.time}`)
      break
    }

case 'ADD_TASK': {
  console.log('Payload recibido:', payload, typeof payload)
  const tasksStore = useTasksStore()
  tasksStore.addTask(payload)
  speak(`Tarea "${payload}" añadida`)
  break
}


    case 'ADD_NOTE': {
      const notesStore = useNotesStore()
      notesStore.addNote(payload)
      speak(`Nota "${payload}" añadida`)
      break
    }

 case 'ADD_SHOPPING_ITEM': {
  const shoppingStore = useShoppingStore()
  shoppingStore.addItem(payload)
  speak(`Artículo "${payload}" añadido a la lista`)
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
  const tasksStore = useTasksStore()
  const today = new Date().toISOString().slice(0, 10)

  const todayTasks = tasksStore.tasks.filter(t => t.date === today)
  const generalTasks = tasksStore.tasks.filter(t => !t.date)

  const allTasks = [...todayTasks, ...generalTasks]

  if (!allTasks.length) {
    speak('No tienes tareas pendientes')
    break
  }

  const parts = []

  if (todayTasks.length) {
    const todayText = todayTasks
      .map(t => t.time ? `a las ${t.time}, ${t.title}` : t.title)
      .join('. ')
    parts.push(`Para hoy tienes ${todayTasks.length} tareas. ${todayText}`)
  }

  if (generalTasks.length) {
    const generalText = generalTasks
      .map(t => t.title)
      .join('. ')
    parts.push(` tienes ${generalTasks.length} tareas pendientes. ${generalText}`)
  }

  
  speak(parts.join('. '))
  break
}


case 'READ_NOTES': {
  const notesStore = useNotesStore()
  if (!notesStore.notes.length) {
    speak('No tienes notas')
    break
  }

  
  const recentNotes = notesStore.notes
    .slice(-10)  
    .map(n => ({ ...n })) 
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

// ✅ TAREAS
case 'DELETE_TASK_BY_NUMBER': {
      const store = useTasksStore()
      const idx = payload - 1
      const task = store.tasks[idx]

      if (!task) {
        speak('No existe esa tarea')
        return
      }

      store.removeTask(task.id)
      speak(`Tarea ${payload} eliminada`)
      break
    }

    case 'DELETE_LAST_TASK': {
      const store = useTasksStore()
      const task = store.tasks[0]

      if (!task) {
        speak('No hay tareas')
        return
      }

      store.removeTask(task.id)
      speak('Última tarea eliminada')
      break
    }

    case 'DELETE_ALL_TASKS': {
      const store = useTasksStore()
      const count = store.tasks.length
      store.tasks = []
      store.persist()
      speak(`Eliminadas ${count} tareas`)
      break
    }

// ✅ NOTAS
case 'DELETE_NOTE_BY_NUMBER': {
      const index = payload - 1
      const note = notesStore.notes[index]

      if (!note) {
        speak('No existe esa nota')
        return
      }

      notesStore.removeNote(note.id)
      speak(`Nota ${payload} eliminada`)
      break
    }

    case 'DELETE_LAST_NOTE': {
      const note = notesStore.notes[0]
      if (!note) {
        speak('No hay notas')
        return
      }

      notesStore.removeNote(note.id)
      speak('Última nota eliminada')
      break
    }

// ✅ ARTÍCULOS
case 'DELETE_LAST_ITEM': {
  const store = useShoppingStore()
  if (!store.items.length) { speak('No hay artículos'); return }
  const last = store.items.at(-1)
  store.removeItem(last.id)
  speak(`Último artículo eliminado: "${last.name}"`)
  break
}

case 'DELETE_ALL_ITEMS': {
  const store = useShoppingStore()
  if (!store.items.length) { speak('No hay artículos'); return }
  store.removeAllItems()
  speak('Se han eliminado todos los artículos')
  break
}

case 'DELETE_ITEM_BY_NUMBER': {
  const store = useShoppingStore()
  const idx = payload - 1
  if (!store.items[idx]) { speak(`No existe el artículo número ${payload}`); return }
  const item = store.items[idx]
  store.removeItem(item.id)
  speak(`Se ha eliminado el artículo "${item.name}"`)
  break
}


  }
}
