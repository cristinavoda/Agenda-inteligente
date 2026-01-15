export function parseIntent(text) {
  const t = text.toLowerCase().trim()

 
  if (t.includes('abrir agenda')) return { intent: 'OPEN_AGENDA' }

  if (t.includes('abrir calendario')) return { intent: 'OPEN_CALENDAR' }
  if (t.includes('abrir tareas')) return { intent: 'OPEN_TASKS' }
  if (t.includes('abrir notas')) return { intent: 'OPEN_NOTES' }
  if (t.includes('abrir lista')) return { intent: 'OPEN_SHOPPING_LIST' }

  
  if (t.startsWith('añadir evento') || t.startsWith('crear evento')) {
   
    const match = t.match(/(?:evento|añadir evento|crear evento)[:]? (.+)/)
    const title = match ? match[1] : 'Evento PA'
    return { 
      intent: 'ADD_EVENT', 
      payload: { title, date: new Date().toISOString().slice(0,10), time: '16:00' } 
    }
  }

  if (t.startsWith('añadir tarea') || t.startsWith('crear tarea')) {
    const match = t.match(/(?:tarea|añadir tarea|crear tarea)[:]? (.+)/)
    const title = match ? match[1] : 'Tarea PA'
    return { intent: 'ADD_TASK', payload: { title, date: new Date().toISOString().slice(0,10), time: '12:00' } }
  }

  if (t.startsWith('añadir nota') || t.startsWith('crear nota')) {
    const match = t.match(/(?:nota|añadir nota|crear nota)[:]? (.+)/)
    const content = match ? match[1] : 'Nota PA'
    return { intent: 'ADD_NOTE', payload: { content } }
  }

  if (t.startsWith('añadir artículo') || t.startsWith('crear artículo') || t.startsWith('añadir a la lista')) {
    const match = t.match(/(?:artículo|añadir artículo|añadir a la lista)[:]? (.+)/)
    const name = match ? match[1] : 'Artículo PA'
    return { intent: 'ADD_SHOPPING_ITEM', payload: { name } }
  }

 
  if (t.includes('leer agenda') || t.includes('leer eventos') || t.includes('qué tengo')) return { intent: 'READ_AGENDA' }
  if (t.includes('leer tareas') || t.includes('qué debo hacer')) return { intent: 'READ_TASKS' }
  if (t.includes('leer notas')) return { intent: 'READ_NOTES' }
  if (t.includes('leer lista') || t.includes('compras')) return { intent: 'READ_SHOPPING_LIST' }

  if (text.includes('borra') && text.includes('nota')) {
    return { type: 'DELETE_LAST_NOTE' }
  }

  // 🗑️ BORRAR TAREA
  if (
    (text.includes('borra') || text.includes('elimina')) &&
    text.includes('tarea')
  ) {
    return { type: 'DELETE_LAST_TASK' }
  }

  
  if (
    (text.includes('borra') || text.includes('elimina')) &&
    (text.includes('compra') || text.includes('lista'))
  ) {
    return { type: 'DELETE_LAST_SHOPPING' }
  }

  return null
}
