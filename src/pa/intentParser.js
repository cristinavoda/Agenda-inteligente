export function parseIntent(text) {
  const t = text.toLowerCase().trim()
const numberWords = { uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,once:12 }
 
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
   return { intent: 'ADD_TASK', payload: title }

  }

  if (t.startsWith('añadir nota') || t.startsWith('crear nota')) {
    const match = t.match(/(?:nota|añadir nota|crear nota)[:]? (.+)/)
    const content = match ? match[1] : 'Nota PA'
    return { intent: 'ADD_NOTE', payload:  content }
  }

  if (
  t.startsWith('añadir artículo') ||
  t.startsWith('crear artículo') ||
  t.startsWith('añadir a la lista')
) {
  const match = t.match(
    /(?:añadir artículo|crear artículo|añadir a la lista|artículo)[:]? (.+)/
  )
  const name = match ? match[1] : 'Artículo PA'

  return {
    intent: 'ADD_SHOPPING_ITEM',
    payload: name
  }
}

 
  if (t.includes('leer agenda') || t.includes('leer eventos') || t.includes('qué tengo')) return { intent: 'READ_AGENDA' }
  if (t.includes('leer tareas') || t.includes('qué debo hacer')) return { intent: 'READ_TASKS' }
  if (t.includes('leer notas')) return { intent: 'READ_NOTES' }
  if (t.includes('leer lista') || t.includes('compras')) return { intent: 'READ_SHOPPING_LIST' }

  if (text.includes('borrar') && text.includes('nota')) {
    return { type: 'DELETE_LAST_NOTE' }
  }

// 🔹 TAREAS
 
if (
    (t.includes('borra') || t.includes('borrar') || t.includes('elimina')) &&
    t.includes('tarea')
  ) {
    if (t.includes('todas')) {
      return { intent: 'DELETE_ALL_TASKS' }
    }

    const match = t.match(/tarea (\d+|uno|dos|tres|cuatro|cinco)/)
    if (match) {
      let n = match[1]
      if (isNaN(n)) n = numberWords[n]
      else n = parseInt(n, 10)

      return { intent: 'DELETE_TASK_BY_NUMBER', payload: n }
    }

    return { intent: 'DELETE_LAST_TASK' }
  }

  return { intent: 'UNKNOWN' }
  // 🔹 NOTAS
  if ((t.includes('borra')||t.includes('borrar')||t.includes('elimina')) && t.includes('nota')) {
    if (t.includes('todas')) return { type:'DELETE_ALL_NOTES' }
    const match = t.match(/nota (\d+|uno|dos|tres|cuatro|cinco)/i)
    if (match) {
      let number = match[1]; if(isNaN(number)) number = numberWords[number.toLowerCase()]; else number=parseInt(number,10)
      return { type:'DELETE_NOTE_BY_NUMBER', payload:number }
    }
    return { type:'DELETE_LAST_NOTE' }
  }

  // 🔹 ARTÍCULOS
  if ((t.includes('borra')||t.includes('borrar')||t.includes('elimina')) && t.includes('artículo')) {
    if (t.includes('todas')) return { type:'DELETE_ALL_ITEMS' }
    const match = t.match(/artículo (\d+|uno|dos|tres|cuatro|cinco|seis|siete)/i)
    if (match) {
      let number = match[1]; if(isNaN(number)) number = numberWords[number.toLowerCase()]; else number=parseInt(number,10)
      return { type:'DELETE_ITEM_BY_NUMBER', payload:number }
    }
    return { type:'DELETE_LAST_ITEM' }
  }

  return { type:'UNKNOWN' }
 
}
