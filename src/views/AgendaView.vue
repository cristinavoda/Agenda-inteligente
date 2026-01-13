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
      <button class="secondary" @click="leerAgenda">🔊 Leer agenda</button>

      <ul class="event-list">
        <li v-for="e in calendarStore.events" :key="e.id">
          {{ e.dateTime }} — {{ e.title }}
          <button  class="close-button" @click="removeEvent(e.id)">✖️</button>
        </li>
      </ul>
    </div>

    <div class="right-panel">
      <FullCalendar ref="calendar" :options="calendarOptions"/>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'

import interactionPlugin from '@fullcalendar/interaction'
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
  plugins: [dayGridPlugin,timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
   locale: esLocale,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialDate: today,
  events: []
})


function addEvent() {
  if (!title.value || !newEventDateTime.value) return
const event = {
  id: Date.now(),
  title: title.value,// obligatorio para FullCalendar
  end: new Date(new Date(newEventDateTime.value).getTime() + 60*60*1000).toISOString(), // 1h por defecto
  reminder: parseInt(newEventReminder.value || 0)
}

  

  calendarStore.addEvent(event)
 
  
  const reminder = createReminderFromEvent(event)
  saveReminder(reminder)

  
  const timeout = reminder.notifyAt - Date.now()
  if (timeout > 0) {
    setTimeout(() => speak(`Recordatorio: ${reminder.title}`), timeout)
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
    .map(e => `${e.dateTime}, ${e.title}`)
    .join('. ')
  speechSynthesis.speak(new SpeechSynthesisUtterance(text || 'No hay eventos'))
}
watch(
  () => calendarStore.events,
  (events) => {
    const api = calendar.value?.getApi()
    if (!api) return

    api.removeAllEvents()

    events.forEach(e => {
      api.addEvent({
        id: e.id,
        title: e.title,
        start: e.dateTime






      })
    })
  },
  { deep: true, immediate: true }
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
  font-weight: 400;
  text-shadow: black;
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
  border: rgb(41, 39, 39) 0.2px solid;
  padding: 0.3rem 0.3rem;
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
  border-radius: 1px;
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
  gap: 2px;
  padding: 2px;
}
body {
    font-size: 15px;
  }
  
  .right-panel {
    padding: 0.5rem;
    width:350px;
    height: fit-content;
  }
h2 {
  font-size: 1rem;
  color:  #0b2494;
  font-weight: 400;
  text-shadow: black;
}
.remove-btn {
  font-size: 0.5rem;
  padding: 0.2rem 0.2rem;}

  .fc {
    padding: 0.4rem;
     width:350px;
    border-radius: 14px;
     height: 800px;
  }

  
  .fc-toolbar {
    flex-direction: column;
    gap: 0.5rem;
  }

  .fc-toolbar-title {
    font-size: 0.8rem !important;
    font-weight: 600;
    text-align: center;
  }

  
  .fc .fc-button {
    font-size: 0.75rem !important;
    padding: 0.25rem 0.55rem !important;
    border-radius: 8px !important;
    color: #0b2494;
  }

  .fc .fc-icon {
    font-size: 0.85rem !important;
  }

  
 
.fc .fc-col-header-cell-cushion {
  font-size: 0.6rem;
  padding: 4px 0;
  color: rgb(47, 23, 184);
  font-weight: 500;
}

  .fc-daygrid-day-frame {
    padding: 4px;
  }
  .fc-daygrid-day-number {
    font-size: 0.85rem;
    padding: 4px;
    color: rgb(30, 30, 31);
  }

  .fc-day-today {
    border-radius: 10px;
  }

  
  .fc-event {
    font-size: 0.7rem !important;
    padding: 2px 4px !important;
    border-radius: 6px !important;
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
  headerToolbar {
  left: "prev,next";
  
  right: "dayGridMonth";
}

}

</style>