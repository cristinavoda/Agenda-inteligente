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
      :class="task.priority || 'low'"
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
 
  <span class="drag">⋮⋮</span>

 
  <span class="number">{{ index + 1 }}.</span>

  
  <input type="checkbox" v-model="task.done" />

 
  <span v-if="!task.editing"
        class="title"
        @click="task.editing = true">
    {{ task.title }}
  </span>

  <input v-else
         v-model="task.title"
         @blur="saveTask(task)"
         @keyup.enter="saveTask(task)" />

  
  <span class="edit-btn" @click="task.editing = true">✎</span>

  
  <span class="delete" @click="remove(task.id)">✖</span>

      </li>

    </ul>
</div>

</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useTasksStore } from '../stores/tasksStore'
import Sortable from 'sortablejs'
import { suggestTasks } from '../utils/tasksAI'
import { subscribeTasks,
  addTask as addTaskFirestore,
  deleteTask as deleteTaskFirestore,
   updateTask as updateTaskFirestore
 } from "../services/tasks";
import { user } from "../stores/user";


async function addTask() {
  if (!newTask.value.trim()) return

  await addTaskFirestore(user.value.uid, newTask.value.trim())

  newTask.value = ""
}

onMounted(() => {
  const el = document.querySelector('.task-list')

  Sortable.create(el, {
    animation: 150,
    handle: '.drag',

    onEnd(evt) {
      const moved = tasksStore.tasks.splice(evt.oldIndex, 1)[0]
      tasksStore.tasks.splice(evt.newIndex, 0, moved)
      //tasksStore.persist()
    }
  })
})

const tasksStore = useTasksStore()

const newTask = ref('')

const selectedItem = ref(null)
const editType = ref('')
const userText = ref('')


onMounted(() => {
  if (!user.value) return;
subscribeTasks(user.value.uid, (data) => {
  tasksStore.setTasks(data)
})
  
});



async function remove(id) {
  await deleteTaskFirestore(id)
}
function formatDate(date) {
  return new Date(date).toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}
async function saveEdit(task) {
    console.log("EDITANDO:", task)
  task.editing = false
  await updateTaskFirestore(task)
}

async function saveTask(task) {
  task.editing = false
  task.showPriority = false

  await updateTaskFirestore(task)
}

function updateTask(task) {
  const index = tasksStore.tasks.findIndex(t => t.id === task.id)
  if (index !== -1) {
    tasksStore.tasks[index] = task
  }
}

 async function handleAI() {

for (const task of suggestions) {
  await addTaskFirestore(user.value.uid, task.title)
}
  
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
 
   margin-top: 1px;
   margin-bottom: 39px;
  font-family: Roboto slab;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
   padding: 0.1rem 1.8rem;
  color: #babdbd;
  text-shadow:
    0 1px 0 rgba(22, 22, 22, 0.8),
    0 2px 4px rgba(0,0,0,.12);
  transition: all 0.5s ease;
  text-shadow: 1px solid black;
  transform: translateY(20px);
  animation: titleEnter 0.8s ease-out forwards;
  font-family: Robo slab;
}
.task-input {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 1.3rem;
  border: 1px solid #e5e5eb;
}

.task-input input {
  flex: 1;
  padding: 4px;
  border: none;
}
.btn-add {
  padding: 9px 11px;
  cursor: pointer;
  font-size: 1.3rem;
  border: white solid 0.5px;
 
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
  font-size: 1.2rem;
}

.number {
  width: 24px;
  font-weight: 600;
  color: #302d2d;
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
  margin-right: 30px;
  padding: 6px;
  display: inline-block;
  background: transparent;
  cursor: pointer;
  font-weight: 600;
  border-bottom: 2px 2px #666;
}

.drag {
  cursor: grab;
  opacity: 0.4;
  color: #666;
  cursor: grab;
  padding: 0 9px;
  
}


.number {
  width: 22px;
  color: #222121;
  font-size: 14px;
}


.title {
  flex: 1;
}


.task-item.done {
  opacity: 0.5;
}

.task-item.done .title {
  text-decoration: line-through;
  color: #999;
}


.priority-bar {
  width: 4px;
  height: 18px;
  border-radius: 2px;
}

.priority-bar.high { background: #ef4444; }
.priority-bar.medium { background: #f59e0b; }
.priority-bar.low { background: #10b981; }


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


</style>