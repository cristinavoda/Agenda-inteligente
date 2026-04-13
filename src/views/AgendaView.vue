
<template>
  <div class="agenda-container">

    <div class="left-panel">
      <h2>Eventos</h2>
      <input v-model="title" placeholder="Título"/>
      <input type="datetime-local" v-model="newEventDateTime"/>
      <select v-model="newEventReminder">
        <option disabled value="">Recordar antes de...</option>
        <option value="10">10 minutos</option>
        <option value="30">30 minutos</option>
        <option value="60">1 hora</option>
        <option value="1440">24 horas</option>
      </select>
     <div class="button-group">
  <button class="primary" @click="addEvent">Añadir</button>
  <button class="secondary" @click="leerAgenda">Leer agenda</button>
</div>

 <hr class="section-divider" /> 

      <ul class="event-list">

<li v-for="e in calendarStore.events" :key="e.id" :style="{ borderLeft: '2px solid ' + (e.color || '#3b82f6') }"
  :class="['event-item', e.priority]">

  
  <div v-if="editingId !== e.id" class="event-info">
    <span class="event-date">
      {{ new Date(e.start).toLocaleDateString('es-ES') }}
    </span>

    <span class="event-time">
      {{ new Date(e.start).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }) }}
    </span>

    <span class="event-title">
      {{ e.title }}
    </span>
  </div>

 
  <div v-else class="edit-mode">
    <input v-model="editedEvent.title" />
<input 
  type="color" 
  v-model="editedEvent.backgroundColor"
  @input="updateEventColorLive(editingId, editedEvent.backgroundColor)"
/>

<select v-model="newEventPriority">
  <option value="low">Baja</option>
  <option value="medium">Media</option>
  <option value="high">Alta</option>
</select>
    <input type="datetime-local" v-model="editedEvent.start" />

    <div class="edit-buttons">
      <button @click="saveEdit">Guardar</button>
      <button @click="cancelEdit">✖️</button>
    </div>
  </div>

  <!-- acciones -->
  <div class="actions">
    <button @click="startEdit(e)">🖋️</button>
    <button class="close-button" @click="removeEvent(e.id)">✖️</button>
  </div>

</li>

     
      </ul>
    </div>

    <div class="right-panel">
      <FullCalendar ref="calendar" :options="calendarOptions"/>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick } from 'vue'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'

import { useCalendarStore } from '../stores/calendarStore'
import { createReminderFromEvent, saveReminder } from '../reminders/reminderEngine'
import { speak } from '../pa/speechOutput'
import { scheduleReminder } from '../utils/reminders'


function addEventWithReminder(title, minutesLater) {
  const now = Date.now()
  const delayMs = minutesLater * 60 * 1000

  calendarStore.addEventWithReminder(title)

  scheduleReminder({
    title: 'Recordatorio de evento',
    body: title,
    delayMs
  })
}

const calendarStore = useCalendarStore()
const calendar = ref(null)

const title = ref('')
const newEventDateTime = ref('')
const newEventReminder = ref('')

const today = new Date().toISOString().slice(0, 10)

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  locale: esLocale,
  editable: true, // 🔥 CLAVE (drag & resize)
  eventStartEditable: true,
  eventDurationEditable: true,

  events: (info, successCallback) => {
    successCallback(calendarStore.events)
  },

  // 👇 DRAG & DROP
  eventDrop: (info) => {
    handleEventChange(info.event)
  },

  // 👇 RESIZE
  eventResize: (info) => {
    handleEventChange(info.event)
    eventDidMount: (info) => {
  if (info.event.extendedProps.priority === 'high') {
    info.el.style.border = '2px solid #111'
  }

  if (info.event.extendedProps.priority === 'low') {
    info.el.style.opacity = '0.7'
  }
}
  }
})


function addEvent() {
  if (!title.value || !newEventDateTime.value) return

  const start = new Date(newEventDateTime.value)
  const end = new Date(start.getTime() + 60 * 60 * 1000) // +1h

  const event = {
    id: Date.now(),
    title: title.value,
    start: start.toISOString(),
    end: end.toISOString(),
    reminder: Number(newEventReminder.value || 0),
    backgroundColor: newEventColor.value,
    priority: newEventPriority.value
  }

  calendarStore.addEvent(event)

 const reminder = createReminderFromEvent(event)

if (reminder) {
  saveReminder(reminder)


}


  title.value = ''
  newEventDateTime.value = ''
  newEventReminder.value = ''
}

function removeEvent(id) {
  calendarStore.removeEvent(id)
}

function leerAgenda() {
  const text = calendarStore.events
    .map(e => {
      const time = new Date(e.start).toLocaleString('es-ES', {
        dateStyle: 'short',
        timeStyle: 'short'
      })
      return `${time}, ${e.title}`
    })
    .join('. ')

  speechSynthesis.speak(
    new SpeechSynthesisUtterance(text || 'No hay eventos')
  )
}
const handleEventChange = (eventApi) => {
  const updated = {
    id: Number(eventApi.id),
    title: eventApi.title,
    start: eventApi.start.toISOString(),
    end: eventApi.end?.toISOString(),
    backgroundColor: eventApi.backgroundColor,
    priority: eventApi.extendedProps.priority || 'medium'
  }

  calendarStore.updateEvent(updated)
}
const editingId = ref(null)

const editedEvent = ref({
  title: '',
  start: '',
  reminder: ''
})
const startEdit = (event) => {
  editingId.value = event.id

  editedEvent.value = {
    ...event,
    start: event.start.slice(0, 16) 
  }
}
const newEventColor = ref('#3b82f6')
const newEventPriority = ref('medium') 

const saveEdit = () => {
  const updated = {
    ...editedEvent.value,
    start: new Date(editedEvent.value.start).toISOString()
  }

  calendarStore.updateEvent(updated)

  const api = calendar.value?.getApi()
  api?.removeAllEvents()
  api?.addEventSource(calendarStore.events)

  editingId.value = null
}


const cancelEdit = () => {
  editingId.value = null
}
const updateEventColorLive = (eventId, color) => {
  const api = calendar.value?.getApi()
  const event = api?.getEventById(eventId)

  if (event) {
    event.setProp('backgroundColor', color) // 🔥 cambia en vivo
  }

  // guardar en store
  const original = calendarStore.events.find(e => e.id === eventId)

  if (original) {
    calendarStore.updateEvent({
      ...original,
      backgroundColor: color
    })
  }
}

watch(
  () => calendarStore.events,
  async () => {
    await nextTick()
    calendar.value?.getApi().refetchEvents()
  },
  { deep: true }
)


</script>


<style >



.agenda-container {
  display: flex;
  height: auto;
  background: #f5f5f7; 
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
    "Segoe UI", sans-serif;
    gap: 1rem;;
}

.left-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 40%;
  max-width: 720px;
  height: fit-content;
  margin: 40px auto;
  padding: 24px;

  border-radius: 20px;

 
  background: rgba(255, 253, 253, 0.363);
  backdrop-filter: blur(12px);


  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}


.left-panel h2 {
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1.5rem;
  color: #0b2494;
  font-family: Robo slab;
}


.left-panel input{
  width: 90%;
  padding: 12px;

  border-radius: 10px;
  border: 1px solid rgba(243, 236, 236, 0.3);

  background:#fcf9f9;
  color: #333;
box-shadow: 1px 2px#a1a0a0;
  outline: none;
  transition: all 0.2s ease;
}
.left-panel select {
  width: 90%;
  padding: 12px;

  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.3);

  background: rgba(255,255,255,0.2);
  color: #333;

  outline: none;
  transition: all 0.2s ease;
}

.left-panel input:focus,
.left-panel select:focus {
  border: 1px solid #d2d4d6;
  background: rgba(255,255,255,0.35);
}
.section-divider {
  width: 100%;
  border: none;
  box-shadow: 2px#0755d3;
  border-top: 1px solid rgba(44, 61, 218, 0.3);
  margin: 40px 0;
}

.button-group {
  display: flex;
  gap: 12px;
  justify-content: center;
  width: 100%;
}


.left-panel button {
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  font-weight: 500;
  transition: all 0.2s ease;
   border-bottom: 2px solid rgb(62, 100, 226);
}


.primary {
  background: linear-gradient(135deg, #f4f4f5, #949dee);
  color: rgb(118, 106, 230);
  border-bottom: 2px solid rgb(62, 100, 226);
}

.primary:hover {
  transform: translateY(-2px);
  background: #f5f6f8;
  color: #0755d3;
  border-bottom: 2px  solid#0755d3;
  
}


.secondary {
  background: rgba(255,255,255,0.4);
  border-bottom: 2px solid rgb(62, 100, 226);
}

.secondary:hover {
  background:  linear-gradient(135deg, #ebedf1, #8f91fc);
  border-bottom: 2px solid rgb(62, 100, 226);
}


.event-list {
  width: 100%;
  margin-top: 0px;
  padding: 0;
  
  list-style: none;
}

.event-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 12px;
  margin-bottom: 8px;

  border-radius: 10px;
  background: rgba(255,255,255,0.25);
}


.event-info {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap; 
}


.event-date {
  color: #6b7280;
  font-size: 0.95rem;
}


.event-time {
  color: #3b82f6;
  font-weight: 500;
}


.event-title {
  color: #111827;
  font-weight: 600;
}

.close-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #0755d3;
  font-size: 0.5rem;
  transition: transform 0.2s;
  margin-right: 0.5rem;
}

.close-button:hover {
  transform: scale(1.2);
}
.edit-mode {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.edit-mode input {
  padding: 6px;
  border-radius: 6px;
}

.actions {
  display: flex;
  gap: 6px;
}

.edit-buttons {
  display: flex;
  gap: 6px;
}
.event-item {
  transition: all 0.2s ease;
}


.low {
  opacity: 0.7;
  
}


.medium {
  opacity: 1;
 
}


.high {
  transform: scale(1.03);
  box-shadow: 0 5px 15px rgba(153, 91, 91, 0.2);
 
}
.high {
  border-left-width: 6px !important;
}

.low {
  filter: grayscale(30%);
}
.right-panel {
  flex: 1;
  width: 65%;
   margin: 40px auto;
   background: #f5f5f7;
   border-radius: 12px;
  height: fit-content;
  overflow-y: auto;
}
.fc {
  background: white;
  margin-top: 0px;
   width: 100%;
   height: 600px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}
.fc-toolbar-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1c1c1e;
}

.fc-button {
  background: #f9f9fa !important;
  border: white !important;
  color: #1c1c1e !important;
  border-radius: 10px !important;
  padding: 0.4rem 0.8rem !important;
  font-weight: 500;
}

.fc-button:hover {
  background: #e5e5ea !important;
}

.fc-button-primary:not(:disabled).fc-button-active {
  background:  #d4cbd4  !important;
  color: white !important;
   border-bottom: 2px solid black;
  text-shadow: #1c1c1e 0.1px 0.1px 0.1px !important;
  
}
.fc-daygrid-day-frame {
  padding: 6px;
   font-size: 0.85rem;
  color: #3a3a3c;
  font-weight: 500;
  font-size: 1rem;
  text-shadow: #1c1c1e;
}

.fc-daygrid-day-number {
  font-size: 0.85rem;
  color: #3a3a3c;
  font-weight: 500;
  font-size: 1rem;
}

.fc-day-today {
  background: #e0dce0 !important;
  border-radius: 12px;
  color: rgb(49, 48, 48) !important;
  font-size: 0.5rem;
}
.fc-event {
  background: transparent!important;
  border: none !important;
  border-radius: 8px !important;
  padding: 3px 6px !important;
  font-size: 1rem;
  font-weight: 500;
  color: #070707;
   text-shadow: 1px 2px #1c1c1e;
}

.fc-event-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fc-scrollgrid,
.fc-scrollgrid-section,
.fc-theme-standard td,
.fc-theme-standard th {
  border: none !important;
}

@media (max-width: 750px) {
  .agenda-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
  }

  body {
    font-size: 15px;
  }

  .left-panel,
  .right-panel {
    width: 100%; 
    padding: 0.5rem;
    box-sizing: border-box;
  }

  h2 {
    font-size: 1rem;
    color: #0b2494;
    font-weight: 600;
    text-shadow: 1px 3px rgb(248, 248, 250);
    margin-bottom: 0.4rem;
  }
  input {
  width: 90%;
  margin-bottom: 0.5rem;
  margin-left: 0;
  padding: 0.3rem 0.2rem;
  border: rgb(121, 119, 119) 1px solid;
  border-width: 0.4px;
  font-size: 1rem;
  font-weight: 500;
}
input:focus {
  outline: none;
  border: rgb(62, 63, 65) 1px solid;
}
button {
  margin-bottom: 1rem;
  background: transparent;
  color: rgb(20, 20, 20);
  border: rgb(243, 239, 239) 0.2px solid;
  border-bottom: 2px solid black;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
}
button:hover {
  background: #ebf3f3;
  border: rgb(171, 209, 216) 1px solid;
}
  .remove-btn {
    font-size: 0.7rem;
    padding: 0.2rem 0.3rem;
  }

 .event-list {
  margin-top: 1px;
  list-style: none;
  padding: 0;
}

.event-list li {
  font-size: 1.1rem;
  font-weight: 500;
  padding: 1px 1px;
  border-bottom: 1px solid #e0dada;
}

.event-list small {
  display: block;
  color: #999;
}

  .fc {
    width: 100%;
    border-radius: 12px;
    height: 700px; 
    padding: 4px;
  }

  .fc-toolbar {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  .fc-toolbar-title {
    font-size: 0.85rem !important;
    font-weight: 600;
    text-align: center;
  }

  .fc .fc-button {
    font-size: 1rem !important;
    padding: 0.25rem 0.55rem !important;
    border-radius: 8px !important;
    color: #0b2494;
  }

  .fc .fc-icon {
    font-size: 1rem !important;
    font-weight: 500;
  }

  .fc .fc-col-header-cell-cushion {
    font-size: 1rem;
    padding: 3px 0;
    color: rgb(47, 23, 184);
    font-weight: 500;
  }

  .fc-daygrid-day-frame {
    padding: 4px;
  }

  .fc-daygrid-day-number {
    font-size: 0.75rem;
    color: rgb(22, 22, 22);
    font-size: 1rem;
    padding: 0.1rem 3px !important;
  }

  .fc-day-today {
    border-radius: 10px;
    color: #0b2494;
  }

  .fc-event {
    font-size: 0.1rem !important;
    padding: 2px 4px !important;
    border-radius: 6px !important;
    color: #e2e2ec;
   
  }

  .fc-event-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #3a3a3c;
    font-size: 0.7rem;
  }


  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none !important;
  }
}

</style>
