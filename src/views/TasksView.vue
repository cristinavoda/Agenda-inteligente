<template>
  <div class="tasks-container">
    <h2>Tareas</h2>

   
    <div class="task-input">
      <input
        v-model="newTask"
        placeholder="Añadir tarea…"
        @keyup.enter="addTask"
      />
      <button class="btn-add" @click="addTask">+</button>
    </div>

    
    
    
    <ul class="task-list">

      
<li v-for="(task, index) in tasksStore.tasks"
    :key="task.id"
      :class="['task-item', { done: task.done }]"
     @dblclick="openEdit(task, 'tasks')">

<span class="badge" :class="task.priority">
  {{ task.priority }}
</span>
  <span class="number">{{ index + 1 }}.</span>
  
  <span class="title">{{ task.title }}</span>
  
  <span class="edit-btn" @click="openEdit(task, 'tasks')">✎</span>

  <span class="task-btn" @click="task.done = !task.done">
  ✔
</span>   

  <button @click="remove(task.id)">✖</button>

</li>
    
    </ul>


    
     <div v-if="isModalOpen" class="modal-backdrop"@click.self="isModalOpen = false">
  <div class="modal">
    
    <h2>Edit {{ editType }}</h2>

    <input v-model="selectedItem.title" />

    <textarea v-if="editType === 'notes'" v-model="selectedItem.text"></textarea>
<select v-model="selectedItem.priority">
  <option value="urgente">urgente</option>
  <option value="importante">importante </option>
  <option value="normal">normal</option>
</select>
<div class="buttons-modal">
    <button @click="saveEdit">Save</button>
    <button @click="isModalOpen = false">Cancel</button>
    </div>

      </div>
    </div>


    
  </div>

 

</template>

<script setup>
import { ref } from 'vue'
import { useTasksStore } from '../stores/tasksStore'

const tasksStore = useTasksStore()
const newTask = ref('')
const isModalOpen = ref(false)
const selectedItem = ref(null)
const editType = ref('')

function openEdit(item, type) {
  selectedItem.value = { ...item }
  editType.value = type
  isModalOpen.value = true
}

function addTask() {
  if (!newTask.value.trim()) return
  tasksStore.addTask(newTask.value.trim())
  newTask.value = ''
}

function remove(id) {
  tasksStore.removeTask(id)
}

function formatDate(date) {
  return new Date(date).toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

function saveEdit() {
  if (editType.value === 'tasks') {
    updateTask(selectedItem.value)
  }

  if (editType.value === 'shopping') {
    updateShopping(selectedItem.value)
  }

  if (editType.value === 'notes') {
    updateNote(selectedItem.value)
  }
console.log('closing modal')
  isModalOpen.value = false
}
function updateTask(task) {
  const index = tasksStore.tasks.findIndex(t => t.id === task.id)
  if (index !== -1) {
    tasksStore.tasks[index] = task
  }
}
</script>

 <style scoped>

.tasks-container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}

.task-input {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 1rem;
}

.task-input input {
  flex: 1;
  padding: 4px;
}
.btn-add {
  padding: 9px 11px;
  cursor: pointer;
  border: white solid 0.5px;
  border-bottom: #181717 solid 2px;
}
.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #d1d1d8;
}


.urgente{
  background: #ff3b30;
  color: white;
  margin-left: 9px;
}

.importante {
  background: #ff9500;
  color: white;
  margin-left: 9px;
}

.normal {
  background: #34c759;
  color: white;
  margin-left: 9px;
}

li.medium {
  border-left: 4px solid #ff9500;
}

li.low {
  border-left: 4px solid #34c759;
}
.number {
  width: 24px;
  font-weight: 600;
  color: #666;
  padding: 20px;;
}

.title {
  flex: 1;
}

.remove {
  background: transparent;
 border: #d1d1d8;
  cursor: pointer;
  opacity: 0.5;
  border-bottom: 2px 2px #666;

}

.remove:hover {
  opacity: 1;
}


.edit-btn {
  margin-right: 40px;
  padding: 6px;
  display: inline-block;
  background: transparent;
  cursor: pointer;
  font-weight: 600;
  border-bottom: 2px 2px #666;
}
.task-btn {
   margin-right: 40px;

  padding: 6px;
  display: inline-block;
  background: transparent;
  cursor: pointer;
  color: darkcyan;
  border-bottom: 2px 2px #666;
}
.buttons-modal {
  display: flex;
  gap: 19px;
  justify-content: center;
  margin-top: 16px;
}
.buttons-modal button:hover {
  transform: scale(1.05);}
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 16px;
  width: 320px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  animation: pop 0.2s ease;
}
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 10px;
  margin-bottom: 8px;
  background: #fff;
  transition: 0.2s;
}

.task-item:hover {
  transform: scale(1.01);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.task-item.high {
  border-left: 4px solid #ff3b30;
}

.task-item.medium {
  border-left: 4px solid #ff9500;
}

.task-item.low {
  border-left: 4px solid #34c759;
}
.badge {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  opacity: 0.8;
}

.high .badge {
  background: #ff3b30;
  color: white;
}

.medium .badge {
  background: #ff9500;
  color: white;
}

.low .badge {
  background: #34c759;
  color: white;
}
.task-item.done {
  margin-right: 100px;
  opacity: 0.4;
  text-decoration: line-through;
}
.actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: 0.2s;
}
.task-item.done {
  opacity: 0.5;
  
}
.task-item:hover .actions {
  opacity: 1;
}

.done .title {
  text-decoration: line-through;
  opacity: 0.5;
   color: #999;
}
.task-item.done .number {
  color: #aaa;
  opacity: 0.6;
}
.task-item.done .badge {
  opacity: 0.4;
  filter: grayscale(100%);
}
.done {
  filter: blur(0.3px);
  transition: 0.2s;
}
</style>