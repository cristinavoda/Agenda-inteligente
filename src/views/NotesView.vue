<template>
  <div class="notes-container">
    <h2 class="title">Notas</h2>

   
    <textarea
      v-model="newNote"
      placeholder="Escribe una nota…"
      rows="5"
    />

    <button @click="addNote" class="save-btn">Guardar nota</button>

    
    <ul class="notes-list">
   <li v-for="(note, index) in notesStore.notes" 
   :key="note.id"
    :class="['note-item', { done: note.done }]"
     @dblclick="openEdit(note, 'notes')">

<span class="badge" :class="note.priority">
  {{ note.priority }}
</span>
  <span class="number">{{ index + 1 }}.</span>
  
  <span class="title">{{ note.title }}</span>
  
 
      <div class="note-content">{{ note.content }}</div>


    <span class="edit-btn" @click="openEdit(note, 'notes')">✎</span>

  <span class="note-btn" @click="note.done = !note.done">
  ✔
</span>   
   

  <div class="note-footer">
    <small>{{ formatDate(note.createdAt) }}</small>
    
    <button @click="remove(note.id)" class="remove">✖</button>
  </div>
</li>
  
    </ul>

    
    
     <div v-if="isModalOpen" class="modal-backdrop"@click.self="isModalOpen = false">
  <div class="modal">
    
    <h2>Edit {{ editType }}</h2>

    <input v-model="selectedItem.title" />

    <textarea v-if="editType === 'notes'" v-model="selectedItem.content"></textarea>
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
import { useNotesStore } from '../stores/notesStore'

const notesStore = useNotesStore()
const newNote = ref('')
const isModalOpen = ref(false)
const selectedItem = ref(null)
const editType = ref('')

function openEdit(item, type) {
  selectedItem.value = { ...item }
  editType.value = type
  isModalOpen.value = true
}

function addNote() {
  if (!newNote.value.trim()) return
  notesStore.addNote(newNote.value.trim())
  newNote.value = ''
}

function remove(id) {
  notesStore.removeNote(id)
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleString('es-ES', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

function saveEdit() {
  if (editType.value === 'notes') {
    updateNote(selectedItem.value)
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
function updateNote(note) {
  const index = notesStore.notes.findIndex(n => n.id === note.id)
  if (index !== -1) {
    notesStore.notes[index] = note
  }
}
</script>



<style scoped>

.notes-container {
  max-width: 900px;
  margin: auto;
}
.notes-container {
  max-width: 900px;
  margin: auto;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 16px;
  font-size: 1.3rem;
    
   background: linear-gradient(135deg, #220aad, #5d5fbe);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-clip: text;
}

.save-btn {
  display: block;
  margin: 0 auto 16px;
  padding: 8px 16px;
  font-size: 1rem;
  
   
   background: linear-gradient(135deg, #2d0de4, #7a7cf7);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background-clip: text;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.save-btn :hover {
  background: linear-gradient(135deg, #2d0de4, #7a7cf7);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

textarea {
  width: 100%;
  padding: 8px;
  resize: vertical;
  margin-bottom: 8px;
}

.notes-list {
  list-style: none;
  padding: 0;
  margin-top: 16px;
}

.notes-list li {
  padding: 12px 0;
  border-bottom: 1px solid #0d0dbb;
}

.note-content {
  font-size: 1.3rem;
  padding: 4px 4px  5px;
  color: #201f1f;
  justify-content: space-between;
  display: inline-flex;
  margin-top: 3px;
  margin-left: 7px;
  color: #201f1f;
}
.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  margin-top: 6px;
  color: #999;
  margin-left: 17px;
}

.note-footer button {
  background: transparent;
  border: white;
  border-bottom: #0f0f0f solid 2px;
  cursor: pointer;
  margin-bottom: 1px;
  height: fit-content;
  font-size: 16px;
  color: #888;
  margin-left: 16px;
}

.note-footer button:hover {
  color: #333;
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
  color: #333131;
  border-bottom: 2px 2px #494747;
  margin-right: 16px;

}

.remove:hover {
  opacity: 1;
}



.edit-btn,
.note-btn {
  background: rgba(0,0,0,0.04);
  border-radius: 8px;
  padding: 6px 8px;
  transition: 0.2s;
}

.edit-btn:hover,
.note-btn:hover {
  background: rgba(0,0,0,0.08);
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
.note-item {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  
  margin-bottom: 12px;
  padding: 14px 4px 14px 16px;
  border-radius: 14px;

  background: #ffffff;
  border: 1px solid #eee;

  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.note-item:hover {
  transform: scale(1.01);
  box-shadow: 0 8px 20px rgba(11, 8, 187, 0.08);
}
.note-item.high {
  border-left: 4px solid #ff3b30;
}

.note-item.medium {
  border-left: 4px solid #ff9500;
}

.note-item.low {
  border-left: 4px solid #34c759;
}
.badge {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  
  opacity: 0.8;
  margin-left: 8px;
  margin-right: 8px;
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

.actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: 0.2s;
}

.note-item:hover .actions {
  opacity: 1;
}

.done .title {
  text-decoration: line-through;
  opacity: 0.5;
   color: #999;
}
.note-item.done .number {
  color: #aaa;
  opacity: 0.6;
}
.note-item.done .badge {
  opacity: 0.4;
  filter: grayscale(100%);
}
.done {
  filter: blur(0.3px);
  transition: 0.2s;
}

@media (max-width: 900px) {
  .notes-container {
    max-width: 100%;
    padding: 0 16px;
  }

  .modal {
    width: 80%;
  }

  .note-item {
    flex-wrap: wrap;
    gap: 8px;
  }

  .note-content {
    font-size: 1.1rem;
  }

  .number {
    padding: 10px;
  }

  .edit-btn,
  .note-btn {
    margin-right: 10px;
  }
}

@media (max-width: 600px) {
  h2 {
    font-size: 1.2rem;
    text-align: center;
  }

  textarea {
    font-size: 1rem;
  }

  .note-item {
    flex-direction: column;
    align-items: flex-start;
    background: #fff;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    padding: 4px 16px;
  }

  .number {
    padding: 0;
  }

  .title {
    width: 100%;
  }
 .note-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .note-content {
    font-size: 1rem;
    width: 100%;
  }

  .note-footer {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .edit-btn,
  .note-btn {
    margin-right: 0;
    padding: 4px;
    font-size: 1.2rem;
  }

  .badge {
    font-size: 10px;
  }

  .modal {
    width: 92%;
    padding: 16px;
  }

  .buttons-modal {
    flex-direction: column;
    width: 100%;
  }

  .buttons-modal button {
    width: 100%;
  }
}
</style>