<template>
  <div class="tasks-container">
    <h2 class="h2">Tareas</h2>

   
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
    :class="{ done: task.done }"
    class="task-item">
<span class="priority-bar"
      :class="task.priority"
      @click="task.showPriority = !task.showPriority">
</span>

<select v-if="task.showPriority"
        v-model="task.priority"
        @change="saveTask(task)"
        @blur="task.showPriority = false">
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
  <!-- DRAG -->
  <span class="drag">⋮⋮</span>

  <!-- NUMBER -->
  <span class="number">{{ index + 1 }}.</span>

  <!-- CHECKBOX -->
  <input type="checkbox" v-model="task.done" />

  <!-- TITLE INLINE -->
  <span v-if="!task.editing"
        class="title"
        @click="task.editing = true">
    {{ task.title }}
  </span>

  <input v-else
         v-model="task.title"
         @blur="saveTask(task)"
         @keyup.enter="saveTask(task)" />

  <!-- PRIORITY BAR (minimalista) -->

  <!-- EDIT (opcional si mantienes inline ya casi sobra) -->
  <span class="edit-btn" @click="task.editing = true">✎</span>

  <!-- DELETE -->
  <span class="delete" @click="tasksStore.removeTask(task.id)">✖</span>

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
import { ref,onMounted } from 'vue'
import { useTasksStore } from '../stores/tasksStore'
import Sortable from 'sortablejs'
import { suggestTasks } from '../utils/tasksAI'

onMounted(() => {
  const el = document.querySelector('.task-list')

  Sortable.create(el, {
    animation: 150,
    handle: '.drag',

    onEnd(evt) {
      const moved = tasksStore.tasks.splice(evt.oldIndex, 1)[0]
      tasksStore.tasks.splice(evt.newIndex, 0, moved)
      tasksStore.persist()
    }
  })
})

const tasksStore = useTasksStore()
const newTask = ref('')
const isModalOpen = ref(false)
const selectedItem = ref(null)
const editType = ref('')
const userText = ref('')

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

function saveEdit(task) {
  task.editing = false
  tasksStore.updateTask(task)
}


function saveTask(task) {
  task.editing = false
  task.showPriority = false
  tasksStore.updateTask(task)
}

function updateTask(task) {
  const index = tasksStore.tasks.findIndex(t => t.id === task.id)
  if (index !== -1) {
    tasksStore.tasks[index] = task
  }
}

function handleAI() {

  const suggestions = suggestTasks(userText.value)

  suggestions.forEach(task => {
    tasksStore.addTask(task.title)
  })

  userText.value = ''
}
</script>

 <style scoped>

.tasks-container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}
.h2 {
  font-size: 14px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  
   background: linear-gradient(135deg, #2d0de4, #18067e);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-clip: text;

  margin: 10px auto 0;
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




.priority-bar {
  width: 4px;
  height: 18px;
  border-radius: 4px;
  display: inline-block;
  margin-right: 20px;
  vertical-align: middle;
}

.priority-bar.urgente {
  background: #d30a0a;
}

.priority-bar.medio{
  background: #f59e0b;
}

.priority-bar.normal {
  background: #10b981;
}
.urgente{
  background: #b31108;
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
.priority-bar {
  width: 4px;
  height: 18px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 8px;
}


.priority-bar.high {
  background: #ef4444;
}

.priority-bar.medium {
  background: #f59e0b;
}

.priority-bar.low {
  background: #10b981;
}


.priority-bar.urgente {
  background: #be0606;
}

.priority-bar.importante {
  background: #f59e0b;
}

.priority-bar.normal {
  background: #10b981;
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



.priority-bar {
  width: 4px;
  height: 18px;
  border-radius: 4px;
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
}

.priority-bar.urgente {
  background: #9e0909;
}

.priority-bar.medio{
  background: #f59e0b;
}

.priority-bar.normal {
  background: #10b981;
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
.task-item.done .bar {
  opacity: 0.4;
  filter: grayscale(100%);
}
.done {
  filter: blur(0.3px);
  transition: 0.2s;
}
.task-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
}

.done {
  opacity: 0.5;
  text-decoration: line-through;
}

.bar {
  width: 4px;
  height: 18px;
  border-radius: 2px;
}

.bar.urgente { background: #af0303; }
.bar.medium { background: #cf8a12; }
.bar.low { background: #10b981; }

.drag {
  cursor: grab;
  opacity: 0.4;
}


.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 6px;
  border-radius: 8px;
}

/* DRAG */
.drag {
  cursor: grab;
  opacity: 0.4;
}

/* NUMBER */
.number {
  width: 22px;
  color: #999;
  font-size: 12px;
}

/* TITLE */
.title {
  flex: 1;
}

/* DONE */
.task-item.done {
  opacity: 0.5;
}

.task-item.done .title {
  text-decoration: line-through;
  color: #999;
}

/* PRIORITY BAR (MUY LIMPIO) */
.priority-bar {
  width: 4px;
  height: 18px;
  border-radius: 2px;
}

.priority-bar.high { background: #ef4444; }
.priority-bar.medium { background: #f59e0b; }
.priority-bar.low { background: #10b981; }

/* DELETE */
.delete {
  opacity: 0.3;
  cursor: pointer;
}

.delete:hover {
  opacity: 1;
}
.task-item .delete,
.task-item .edit-btn {
  opacity: 0;
  transition: 0.2s;
}

.task-item:hover .delete,
.task-item:hover .edit-btn {
  opacity: 1;
}
.task-item {
  border-left: 3px solid transparent;
}

.task-item.high { border-left-color: #ef4444; }
.task-item.medium { border-left-color: #f59e0b; }
.task-item.low { border-left-color: #10b981; }
</style>