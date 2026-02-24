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
 
    case 'STOP_SPEAKING':
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel()
  }
  break

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

     case 'OPEN_INTERNET':
  router.push({ path: '/internet', query: { q: payload || '' } })
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

  // 🔹 Extraemos todos los nombres
  const allItems = shoppingStore.items.map(i => i.name)

  // 🔹 Plural
  const plural = allItems.length > 1 ? 'artículos' : 'artículo'
  speak(`Tienes ${allItems.length} ${plural} en la lista de la compra.`)

  // 🔹 Si hay muchos, leemos en chunks de 10 para no saturar
  const chunkSize = 10
  for (let i = 0; i < allItems.length; i += chunkSize) {
    const chunk = allItems.slice(i, i + chunkSize).join('. ')
    speak(chunk)
  }

  break
}

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


case 'DELETE_NOTE_BY_NUMBER': {
  const store = useNotesStore()
  const idx = payload - 1
  const note = store.notes[idx]

  if (!note) {
    speak('No existe esa nota')
    return
  }

  store.removeNote(note.id)
  speak(`Nota ${payload} eliminada`)
  break
}

case 'DELETE_LAST_NOTE': {
  const store = useNotesStore()
  const note = store.notes[0]

  if (!note) {
    speak('No hay notas')
    return
  }

  store.removeNote(note.id)
  speak('Última nota eliminada')
  break
}

case 'DELETE_ALL_NOTES': {
  const store = useNotesStore()
  store.notes = []
  store.persist?.()
  speak('Todas las notas eliminadas')
  break
}


case 'DELETE_ITEM_BY_NUMBER': {
  const store = useShoppingStore()
  let idx = payload - 1
  const item = store.items[idx]

  if (!item) {
    speak(`No existe el artículo número ${payload}`)
    return
  }

 
  store.items.splice(idx, 1)
  localStorage.setItem('shopping', JSON.stringify(store.items))

  speak(`He eliminado ${item.name}`)
  break
}

case 'DELETE_ALL_ITEMS': {
  const store = useShoppingStore()

  if (!store.items.length) {
    speak('La lista ya está vacía')
    return
  }

  
  store.items.splice(0, store.items.length)
  localStorage.setItem('shopping', JSON.stringify([]))

  speak('He eliminado todos los artículos de la lista')
  break
}





case 'SET_EVENT_REMINDER': {
  const calendarStore = useCalendarStore()
  const { taskTitle, minutes } = payload
  calendarStore.addEvent(title)

  scheduleReminder({
    title: 'Recordatorio',
    body: title,
    delayMs: minutes * 60 * 1000,
  })

  speak(`Recordatorio para "${title}" en ${minutes} minutos`)
  break
}


  }
}
