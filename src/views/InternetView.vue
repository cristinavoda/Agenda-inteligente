<template>
  <div class="internet-wrapper">
    <h1 class="title">Buscar</h1>

    <div class="search-box">
      <input
        v-model="searchQuery"
        @keyup.enter="search"
        placeholder="Explorar conocimiento..."
      />
      <button @click="search"><Search :size="20" /></button>
    </div>

    <div v-if="loading" class="status">Buscando...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="results.length" class="results">
      <div
        v-for="item in results"
        :key="item.pageid"
        class="card"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ cleanSnippet(item.snippet) }}...</p>

        <div class="actions">
          <button @click="readResult(item)">Leer</button>
          <a
            :href="wikiLink(item.pageid)"
            target="_blank"
            class="external-link"
          >
            Ver completo
          </a>
          <button @click="addToNotes(item)">Añadir a Notas</button>
        
        </div>
      </div>
    </div>

    <div v-if="searched && !results.length && !loading">
      No se encontraron resultados.
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNotesStore } from '../stores/notesStore'
import { Pencil, Trash2, CalendarDays, Bot,Search } from '@lucide/vue'


const route = useRoute()
const notesStore = useNotesStore()

const searchQuery = ref('')
const results = ref([])
const loading = ref(false)
const error = ref('')
const searched = ref(false)

function cleanSnippet(html) {
  return html.replace(/<\/?[^>]+(>|$)/g, '')
}

function wikiLink(id) {
  return `https://es.wikipedia.org/?curid=${id}`
}

async function search() {
  if (!searchQuery.value.trim()) return

  loading.value = true
  results.value = []
  searched.value = true
  error.value = ''

  try {
    const res = await fetch(
      `https://es.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodeURIComponent(searchQuery.value)}`
    )
    const data = await res.json()
    results.value = data.query.search.slice(0, 5)
  } catch (e) {
    error.value = 'Error al buscar información'
  } finally {
    loading.value = false
  }
}


function readResult(item) {
  const text = `${item.title}. ${cleanSnippet(item.snippet)}`
  const speech = new SpeechSynthesisUtterance(text)
  speech.lang = 'es-ES'
  window.speechSynthesis.speak(speech)
}


function addToNotes(item) {
  const content = `${item.title}\n\n${cleanSnippet(item.snippet)}\n\nFuente: ${wikiLink(item.pageid)}`
  notesStore.addNote(content)
}


onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
    search()
  }
})

watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery) {
      searchQuery.value = newQuery
      search()
    }
  }
)
</script>

<style scoped>
.title {
  text-align: center;
  margin-top: 1px;
  margin-bottom: 39px;
  font-family: Roboto slab;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
   padding: 0.1rem 1.8rem;
  color: #babdbd;
  text-shadow:
    0 1px 0 rgba(73, 71, 71, 0.8),
    0 2px 4px rgba(0,0,0,.12);
  transition: all 0.5s ease;
  text-shadow: 1px solid black;
  transform: translateY(20px);
  animation: titleEnter 0.8s ease-out forwards;
  font-family: Robo slab;
}

.internet-wrapper {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  color: rgb(59, 59, 63);
}

.title {
  text-align: center;
  font-weight: 500;
  margin-bottom: 2rem;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
}

input {
  flex: 1;
  padding: 0.7rem;
  border: none;
}

button {
  padding: 0.6rem 1rem;
  border: none;
  background: transparent;
  color: rgb(34, 33, 33);
  cursor: pointer;
  transition: 0.2s;
  font-size: 1.1rem;
  border-bottom: 1px solid black;
}

button:hover {
  opacity: 0.8;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background: #f6f6f6;
  padding: 1.5rem;
  border-radius: 18px;
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-3px);
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 26px;
  align-items: center;
}

a {
  color: #0056b3;
  text-decoration: none;
  font-size: 0.9rem;
  text-decoration: underline;
}
  .external-link {
    color: #292f36;
    text-decoration: none;
    font-size: 1.1rem;
    
  }
</style>