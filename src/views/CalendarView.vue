<template>
  <div>
    <h1>Calendario</h1>

    <p>Total eventos: {{ calendarStore.events.length }}</p>

    <ul>
      <li v-for="event in calendarStore.events" :key="event.id">
        {{ event.date }} —  {{ event.time }}  — {{ event.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCalendarStore } from '../stores/calendarStore'

const calendarStore = useCalendarStore()

console.log('STORE:', calendarStore)

if (calendarStore.events.length === 0) {
 calendarStore.addEvent({
  title: 'Evento de prueba',
  date: '2026-01-11',
  time: '15:10'
}
)
calendarStore.addEvent({
  title: 'Evento de prueba2',
  date: '2026-01-11',
  time: '15:20'
}
)

}
</script>
