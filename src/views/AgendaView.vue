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
      <button class="primary" @click="addEvent">Añadir</button>
      <button class="secondary" @click="leerAgenda">Leer agenda</button>

      <ul class="event-list">
       <li v-for="e in calendarStore.events" :key="e.id">
  {{ new Date(e.start).toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  }) }}
  — {{ e.title }}
  <button class="close-button" @click="removeEvent(e.id)">✖️</button>
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
  height: 'auto',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialDate: today,
 events: (info, successCallback) => {
    successCallback(calendarStore.events) 
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
    reminder: Number(newEventReminder.value || 0)
  }

  calendarStore.addEvent(event)

 const reminder = createReminderFromEvent(event)

if (reminder) {
  saveReminder(reminder)

  const timeout = reminder.notifyAt - Date.now()
  if (timeout > 0) {
    setTimeout(() => {
      speak(`Recordatorio: ${reminder.title}`)
    }, timeout)
  }
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
 
.left-panel {
  width: 35%;
}
.right-panel {
  width: 65%;
}
h2 {
  font-size: 1.5rem;
  color:  #232325;
  font-weight: 600;
  text-shadow: rgb(248, 245, 245);
}
input {
  width: 90%;
  margin-bottom: 0.5rem;
  margin-left: 0;
  padding: 0.5rem 0.2rem;
  border: rgb(121, 119, 119) 1px solid;
  border-width: 0.4px;
}
input:focus {
  outline: none;
  border: rgb(62, 63, 65) 1px solid;
}
.close-button {
  background: transparent;
  border: rgb(219, 213, 213) 0.5px solid;
  margin-right: 5rem;
  padding: 0.2rem 0.3rem;
  border-radius: 6px;
  color: #4e4a4a;
  font-size: 0.5rem;
  cursor: pointer;
}
button {
  margin-bottom: 1rem;
  background: transparent;
  color: rgb(56, 55, 55);
  border: rgb(41, 39, 39) 0.2px solid;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  
  cursor: pointer;
}
button:hover {
  background: #ebf3f3;
  border: rgb(171, 209, 216) 1px solid;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  margin: 0.3rem 0;
}

.agenda-container {
  display: flex;
  height: 100vh;
  background: #f5f5f7; 
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
    "Segoe UI", sans-serif;
}


.left-panel {
  width: 30%;
  margin-top: 2%;
  height: fit-content;
  background: white;
  
  padding: 1rem;
  border-right: 1px solid #e5e5ea;
  overflow-y: auto;
  height: fit-content;
}
.event-list {
  margin-top: 16px;
  list-style: none;
  padding: 0;
}

.event-list li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.event-list small {
  display: block;
  color: #999;
}


.right-panel {
  flex: 1;
  width: 65%;
  padding: 16px;
   background: #f5f5f7;
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
}

.fc-daygrid-day-number {
  font-size: 0.85rem;
  color: #3a3a3c;
  font-weight: 500;
  font-size: 1rem;
}

.fc-day-today {
  background: #d4cbd4 !important;
  border-radius: 12px;
  color: rgb(49, 48, 48) !important;
}
.fc-event {
  background: transparent!important;
  border: none !important;
  border-radius: 8px !important;
  padding: 3px 6px !important;
  font-size: 1rem;
  font-weight: 500;
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
  border: rgb(41, 39, 39) 0.2px solid;
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
  }

  .fc-event {
    font-size: 0.1rem !important;
    padding: 2px 4px !important;
    border-radius: 6px !important;
    color: #e2e2ec;
    text-shadow: black;
  }

  .fc-event-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }


  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none !important;
  }
}

</style>