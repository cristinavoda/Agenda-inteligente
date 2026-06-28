<template>
  <div class="shopping-container">
  

   
    <div class="shop-input">
      <input
  v-model="newItem.title"
  placeholder="Producto…"
  @keyup.enter="addItem"
   class="shop-input"
/>

<input
  v-model="newItem.quantity"
  placeholder="Cantidad (ej: 1L, 200g)"
  @keyup.enter="addItem"
  class="shop-input"
/>


      <button @click="addItem" class="btn-add">+</button>
    
<input v-model="userText" placeholder="Menu:...."  class="shop-input" />

<button @click="handleAI" class="btn-AI">
   Generar lista
</button>
   
    </div>
 <h2 class="h2">Lista de la compra</h2>
   <button class="btn-clear" @click="shoppingStore.clearShoppingList()">
     Borrar lista
  </button>

    <ul class="shop-list">
   
      <li
        v-for="(item, index) in shoppingStore.items"
        :key="item.id"
        :class="[ { done: item.done }]"
         @dblclick="openEdit(item, 'shopping')">
         

   <span class="priority-bar" :class="item.priority"></span>

        <span class="number">{{ index + 1 }}.</span>


        <span
          class="title"
          @click="toggle(item.id)"
        >
          {{ item.title }}

        </span>


  <span class="qty">
    {{ item.quantity }}
  </span>

 <span class="edit-btn" @click="openEdit(item, 'shopping')">✎</span>

 <span class="item-btn" @click="toggleDone(item)">
  ✔
</span>
        <button class="remove" @click="remove(item.id)">✖</button>
      </li>
    </ul>

     
     <div v-if="isModalOpen" class="modal-backdrop"@click.self="isModalOpen = false">

<div class="modal">

  <h2>Edit {{ editType }}</h2>

  <input v-model="selectedItem.title" placeholder="Producto" />

  <input
    v-model="selectedItem.quantity"
    placeholder="Cantidad (ej: 1L, 200g)"
  />

  <select v-model="selectedItem.priority">
    <option value="normal">normal</option>
    <option value="medio">medio</option>
    <option value="urgente">urgente</option>
  </select>

  <label>
    <input type="checkbox" v-model="selectedItem.done" />
    Comprado
  </label>

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
import { useShoppingStore } from '../stores/shoppingStore'
import { generateShoppingList } from '../utils/shoppingAI'


const userText = ref('')
const shoppingStore = useShoppingStore()
const newItem = ref({
  title: '',
  quantity: ''
})
const isModalOpen = ref(false)
const selectedItem = ref(null)
const editType = ref('')


function handleAI() {
  const items = generateShoppingList(userText.value)

  items.forEach(item => {
    shoppingStore.addItem({
      title: item,
      quantity: '',
      priority: '',
      done: false
    })
  })

  userText.value = ''
}



function openEdit(item, type) {
  selectedItem.value = { ...item }
  editType.value = type
  isModalOpen.value = true
}

function saveEdit() {
  if (editType.value === 'shopping') {
    shoppingStore.updateShopping({ ...selectedItem.value })
  }

  isModalOpen.value = false
}

function addItem() {
  if (!newItem.value.title.trim()) return

  shoppingStore.addItem({
    title: newItem.value.title,
    quantity: newItem.value.quantity,
    priority: '',
    done: false
  })

  newItem.value.title = ''
  newItem.value.quantity = ''
}

function toggle(id) {
  shoppingStore.toggleItem(id)
}

function remove(id) {
  shoppingStore.removeItem(id)
}
function toggleDone(item) {
  item.done = !item.done
  shoppingStore.persist()
}

function updateShopping(item) {
  const index = shoppingStore.items.findIndex(i => i.id === item.id)

  if (index !== -1) {
    shoppingStore.items.splice(index, 1, {
      ...item
    })
  }

  shoppingStore.persist()
}

function clearShoppingList() {
  if (!confirm('¿Seguro que quieres borrar toda la lista?')) return

  items.value = []
  persist()
}
</script>
<style scoped>
.shopping-container {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
}
.shopping-container {
  max-width: 500px;
  margin: auto;
}
.shop-input {
  border:#e5e5ea;
}
.h2 {
  text-align: center;
  margin-bottom: 1rem;
  
   background: linear-gradient(135deg, #1d0799,  #48ecd6);

  -webkit-background-clip: text;
  -webkit-text-fill-color: rgb(0, 17, 255);



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

  margin: 10px auto 20px;
}


.shop-input input {
  flex: 1;
  padding: 6px;
   display: flex;
   width: 100%;
  gap: 8px;
  margin-bottom: 12px;
}

.shop-list {
  list-style: none;
  padding: 0;
}

.shop-list li {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e5e5ea;
}

.number {
  width: 24px;
  font-weight: 600;
  color: #666;
}

.title {
  flex: 1;
  cursor: pointer;
}
.done .title,
.done .qty {
  text-decoration: line-through;
  opacity: 0.5;
  
}
.bought .title {
  text-decoration: line-through;
  color: #999;
}


.qty {
 padding: 10px 90px ;
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
  background: #ef4444;
}

.priority-bar.medio{
  background: #f59e0b;
}

.priority-bar.normal {
  background: #10b981;
}
.btn-add {
font-size: large;
font-weight: 600;
 border: none;
 padding: 10px;
}
.btn-add:hover {
transform: scale(1.05);background-color: #797878;
color: white;

}
.btn-AI {
 font-size: large;
color: #666;
 border: none; 
}
.btn-AI:hover {
transform: scale(1.05);background-color: #797878;
color: white;

} 
.remove {
  background: transparent;
 border: #d1d1d8;
  cursor: pointer;
  opacity: 0.5;
  border-bottom: 2px 2px #666;
margin-bottom: 0;
}

.remove:hover {
  opacity: 1;
  border-bottom: 2px solid#0f0f0f;
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
.item-btn {
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

.item-btn.done {
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
.item-btn.done {
  opacity: 0.5;
  
}
.item-btn:hover .actions {
  opacity: 1;
}

.done .title {
  text-decoration: line-through;
  opacity: 0.5;
   color: #999;
}
.done .number {
  color: #aaa;
  opacity: 0.6;
}
.done .qty {
  color: #aaa;
  opacity: 0.6;
}
.shop-list li.done{
  opacity: 0.4;
  filter: grayscale(100%);
}
.done {
  filter: blur(0.3px);
  transition: 0.2s;
}
</style>