
<template>
  <div class="planning-container">
    <h2 class="planning-title">Planificación diaria</h2>

    <div class="date-navigation">
      <button type="button" @click="changeDate(-1)" aria-label="Día anterior">
        <ChevronLeft />
      </button>

      <input
        type="date"
        v-model="planningStore.selectedDate"
        aria-label="Seleccionar fecha"
      />

      <button type="button" @click="changeDate(1)" aria-label="Día siguiente">
        <ChevronRight />
      </button>
    </div>

    <form class="activity-input" @submit.prevent="addActivity">
      <input
        v-model="newTitle"
        placeholder="Añadir actividad..."
        aria-label="Nombre de la actividad"
        required
      />

      <input
        v-model="newTime"
        type="time"
        aria-label="Hora de la actividad"
        required
      />

      <select v-model="newPriority" aria-label="Prioridad">
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>

      <button type="submit" aria-label="Añadir actividad">
        <Plus />
      </button>
    </form>

    <div class="activity-list">
      <div
        v-for="activity in planningStore.activities"
        :key="activity.id"
        class="activity-row"
        :class="{ done: activity.done }"
      >
        <input
          v-if="activity.editing"
          v-model="activity.time"
          type="time"
          class="time-input"
          aria-label="Editar hora"
        />

        <span v-else class="activity-time">{{ activity.time }}</span>

        <button
          type="button"
          class="priority-bar"
          :class="activity.priority || 'low'"
          :aria-label="'Cambiar prioridad: ' + activity.priority"
          @click="cyclePriority(activity)"
        />

        <input
          v-if="activity.editing"
          v-model="activity.title"
          class="activity-title-input"
          aria-label="Editar actividad"
          @keyup.enter="saveActivity(activity)"
        />

        <span v-else class="activity-title">
          {{ activity.title }}
        </span>

        <div class="activity-actions">
          <span class="drag-handle" title="Arrastrar">
            <GripVertical />
          </span>

          <input
            v-model="activity.done"
            type="checkbox"
            aria-label="Actividad completada"
            @change="saveActivity(activity)"
          />

          <button
            type="button"
            aria-label="Editar actividad"
            @click="toggleEdit(activity)"
          >
            <Pencil />
          </button>

          <button
            type="button"
            aria-label="Eliminar actividad"
            @click="activityToDelete = activity.id"
          >
            <Trash2 />
          </button>
        </div>

        <button
          v-if="activity.editing"
          type="button"
          class="save-button"
          @click="saveActivity(activity)"
        >
          Guardar
        </button>
      </div>
    </div>

    <div v-if="activityToDelete" class="modal-overlay">
      <section
        class="delete-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <h3 id="delete-title">Eliminar actividad</h3>

        <p>
          ¿Quieres eliminar esta actividad?
          Esta acción no se puede deshacer.
        </p>

        <div class="delete-actions">
          <button type="button" @click="activityToDelete = null">
            Cancelar
          </button>

          <button type="button" @click="confirmDelete">
            Eliminar
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import Sortable from 'sortablejs'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  GripVertical,
  Pencil,
  Trash2
} from '@lucide/vue'

import { user } from '../stores/user'
import { useDailyPlanningStore } from '../stores/dailyPlanningStore'

import {
  subscribeDailyActivities,
  addDailyActivity,
  updateDailyActivity,
  updateDailyActivityOrder,
  deleteDailyActivity
} from '../services/dailyPlanning'

const planningStore = useDailyPlanningStore()

const newTitle = ref('')
const newTime = ref('09:00')
const newPriority = ref('low')
const activityToDelete = ref(null)

let unsubscribe = null
let sortable = null

function changeDate(days) {
  const date = new Date(
    planningStore.selectedDate + 'T12:00:00'
  )

  date.setDate(date.getDate() + days)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  planningStore.setSelectedDate(`${year}-${month}-${day}`)
}

function listenToActivities() {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }

  if (!user.value?.uid) return

  unsubscribe = subscribeDailyActivities(
    user.value.uid,
    planningStore.selectedDate,
    (activities) => {
      planningStore.setActivities(
        activities.map(activity => ({
          ...activity,
          editing: false
        }))
      )
    }
  )
}

watch(() => planningStore.selectedDate, listenToActivities)

onMounted(() => {
  listenToActivities()

  const list = document.querySelector('.activity-list')

  if (list) {
    sortable = Sortable.create(list, {
      animation: 150,
      handle: '.drag-handle',

      onEnd: async ({ oldIndex, newIndex }) => {
        if (oldIndex == null || newIndex == null || oldIndex === newIndex) {
          return
        }

        const activities = planningStore.activities
        const moved = activities.splice(oldIndex, 1)[0]
        activities.splice(newIndex, 0, moved)

        try {
          await Promise.all(
            activities.map((activity, index) =>
              updateDailyActivityOrder(activity.id, index)
            )
          )
        } catch (error) {
          console.error('Error al guardar el orden:', error)
        }
      }
    })
  }
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
  if (sortable) sortable.destroy()
})

async function addActivity() {
  if (!newTitle.value.trim() || !user.value?.uid) return
console.log('Usuario autenticado:', user.value?.uid)
console.log('Fecha seleccionada:', planningStore.selectedDate)
  try {
    await addDailyActivity(
      user.value.uid,
      planningStore.selectedDate,
      {
        title: newTitle.value.trim(),
        time: newTime.value,
        priority: newPriority.value,
        order: planningStore.activities.length
      }
    )

    newTitle.value = ''
    newTime.value = '09:00'
    newPriority.value = 'low'
  } catch (error) {
    console.error('Error al añadir actividad:', error)
  }
}

async function saveActivity(activity) {
  activity.editing = false

  try {
    await updateDailyActivity(activity)
  } catch (error) {
    console.error('Error al guardar actividad:', error)
  }
}

function toggleEdit(activity) {
  activity.editing = !activity.editing
}

async function cyclePriority(activity) {
  const priorities = ['low', 'medium', 'high']
  const current = priorities.indexOf(activity.priority || 'low')

  activity.priority = priorities[(current + 1) % priorities.length]

  await saveActivity(activity)
}

async function confirmDelete() {
  if (!activityToDelete.value) return

  try {
    await deleteDailyActivity(activityToDelete.value)
    activityToDelete.value = null
  } catch (error) {
    console.error('Error al eliminar actividad:', error)
  }
}
</script>

<style scoped>
.planning-container {
  max-width: 850px;
  margin: auto;
  padding: 1rem;
  color: #302d2d;
}

.planning-title {
  margin: 1rem 0 2rem;
  color: #858b8b;
  font-family: 'Roboto Slab', serif;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.date-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.date-navigation button,
.activity-actions button,
.activity-input button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.date-navigation svg,
.activity-actions svg {
  width: 18px;
  height: 18px;
}

.date-navigation input {
  padding: 0.5rem;
  border: 1px solid #e5e5eb;
  font: inherit;
}

.activity-input {
  display: grid;
  grid-template-columns: minmax(140px, 1fr) 105px 95px 40px;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.activity-input input,
.activity-input select {
  min-width: 0;
  padding: 0.6rem;
  border: 1px solid #e5e5eb;
  background: white;
  font: inherit;
}

.activity-input button {
  border: 1px solid #e5e5eb;
}

.activity-list {
  border-top: 1px solid #d1d1d8;
}

.activity-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-height: 58px;
  padding: 0.5rem 0.25rem;
  border-bottom: 1px solid #d1d1d8;
}

.activity-time,
.time-input {
  flex: 0 0 65px;
  width: 65px;
  font-size: 0.95rem;
}

.time-input,
.activity-title-input {
  min-width: 0;
  padding: 0.3rem;
  border: 1px solid #e5e5eb;
  font: inherit;
}

.priority-bar {
  flex: 0 0 5px;
  width: 5px;
  height: 27px;
  padding: 0;
  border: 0;
  border-radius: 2px;
  cursor: pointer;
}

.priority-bar.high { background: #ef4444; }
.priority-bar.medium { background: #f59e0b; }
.priority-bar.low { background: #10b981; }

.activity-title {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.activity-title-input {
  flex: 1;
}

.activity-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.activity-actions button {
  padding: 0.15rem;
}

.activity-actions input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.drag-handle {
  display: inline-flex;
  cursor: grab;
  touch-action: none;
}

.done .activity-title {
  color: #999;
  text-decoration: line-through;
}

.save-button {
  padding: 0.4rem;
  border: 1px solid #d1d1d8;
  background: white;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.65);
}

.delete-dialog {
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  color: #222;
  text-align: center;
}

.delete-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.delete-actions button {
  padding: 0.6rem 1rem;
  border: 0;
  cursor: pointer;
}

.delete-actions button:last-child {
  background: #dc3545;
  color: white;
}

@media (max-width: 600px) {
  .activity-input {
    grid-template-columns: minmax(0, 1fr) 95px 40px;
  }

  .activity-input select {
    grid-column: 1 / 3;
    grid-row: 2;
  }

  .activity-row {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .activity-actions {
    gap: 0.45rem;
  }
}
</style>
