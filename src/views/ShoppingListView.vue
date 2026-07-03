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
  class="shop-input-qty"
/>


      <button @click="addItem" class="btn-add">+</button>
    
<input v-model="userText" placeholder="Menu semanal:...."  class="shop-input" />

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

<span class="title">
  {{ item.title }}

  <span class="qty">
    {{ item.quantity }}
  </span>
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
import { shoppingAIv2 } from '../utils/shoppingAI'


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
  const result = shoppingAIv2(userText.value)
console.log(result)
 if (!result || !result.shoppingList) return
  result.shoppingList.forEach(item => {
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
  margin: auto;
  padding: 1rem;
}

.shop-input {
  border:#e5e5ea;
}


.h2 {
  font-size: 14px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 10px auto 20px;
  margin-top: 1px;
  margin-bottom: 39px;
  font-family: Roboto slab;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  padding: 0.1rem 1.8rem;
  color: #a3a5a5;
  text-shadow:
    0 1px 0 rgba(73, 71, 71, 0.8),
    0 2px 4px rgba(0,0,0,.12);
  transition: all 0.5s ease;
  text-shadow: 1px solid black;
  transform: translateY(20px);
  animation: titleEnter 0.8s ease-out forwards;
  font-family: Robo slab;
}
.shop-input-qty {
  border:#e5e5ea;
   width: 90%;
   font-size: 1.2rem;
   padding: 6px;
}
.shop-input input {
  flex: 1;
  padding: 6px;
  display: flex;
  width: 90%;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 1.2rem;
}

.shop-list {
  list-style: none;
  padding: 0;
}

.shop-list li {
  display: flex;
  align-items: flex-start;
  gap: 17px;
  padding: 10px 10px;
  border-bottom: 1px solid #e5e5ea;
  font-size: 1.2rem;
  font-family: inter;
 
}

.number {
  width: 24px;
  font-weight: 600;
  color: #666;
}

.title {
  flex: 1;
  color: #070707;
  cursor: pointer;
}


.qty{
    display:inline-flex;
    align-items:center;
    justify-content:center;

    min-width:22px;
    height:22px;

    margin-left:.5rem;

    border-radius:11px;

   
    color:#070707;

    font-size:.75rem;
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


.priority-bar {
  width: 4px;
  height: 25px;
  border-radius: 4px;
  display: inline-block;
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
 
}
.btn-add:hover {
transform: scale(1.05);background-color: #797878;
color: white;

}
 
.remove {
  background: transparent;
 border: #d1d1d8;
  cursor: pointer;
  color: #333131;
  font-size: 1.3rem;
  margin-right: 16px;

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
  background: linear-gradient(135deg, #ffffff, #909096);
  color: white;
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
.btn-AI{
  all: unset;

  cursor: pointer;

  padding: 8px 16px;

  border-bottom: 1px solid #232324;

  font-family: Inter, sans-serif;
  font-size: 1rem;
}
.btn-AI:hover{
  color:#222;
  border-bottom-color:#222;
  font-weight:900;
  font-size:1.3rem;
}

.btn-clear:hover{
  color:#222;
  border-bottom-color:#222;
  font-weight:900;
  font-size:1.3rem;
}
.btn-clear{
  all: unset;

  cursor: pointer;

  padding: 8px 16px;

  border-bottom: 1px solid #232324;

  font-family: Inter, sans-serif;
  font-size: 1rem;
}
@media (max-width: 768px) {

  li{
    display:flex;
    align-items:center;
    gap:.45rem;

    padding:.55rem .45rem;
    font-size:.92rem;
  }

  .priority-bar{
    width:5px;
    height:26px;
    
  }

  .number{
    display:none;
   
  }

  .title{
    flex:1;
    
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .qty{
    min-width:32px;
    text-align:center;
    font-size: 1rem;
  }

  .edit-btn,
  .item-btn,
  .remove{

    width:32px;
    height:32px;

    display:flex;
    align-items:center;
    justify-content:center;

    font-size:1rem;
  }

}
</style>