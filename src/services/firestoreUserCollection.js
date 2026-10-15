
import { ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'

export function toMillis(value) {
  if (value && typeof value.toMillis === 'function') {
    return value.toMillis()
  }

  const number = Number(value)
  return Number.isFinite(number) && number > 0
    ? number
    : Date.now()
}

function readLocalArray(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function createFirestoreUserCollection({
  collectionName,
  storageKey,
  normalize
}) {
  const items = ref([])
  const ready = ref(false)

  let currentUid = null
  let generation = 0
  let stopSnapshot = null

  function userQuery(uid) {
    return query(
      collection(db, collectionName),
      where('uid', '==', uid)
    )
  }

  async function initializeUser(user, currentGeneration) {
    const q = userQuery(user.uid)
    const existing = await getDocs(q)

    if (currentGeneration !== generation) return

    const migrationFlag =
      `__firestore_migrated_${collectionName}_v1`

    const backupKey =
      `${storageKey}_backup_before_firestore_v1`

    // Preservar una copia de los datos locales originales.
    if (localStorage.getItem(backupKey) === null) {
      localStorage.setItem(
        backupKey,
        localStorage.getItem(storageKey) || '[]'
      )
    }

    // Migrar una sola vez y solo si el usuario aún no tiene datos remotos.
    if (localStorage.getItem(migrationFlag) !== 'true') {
      const legacyItems = readLocalArray(storageKey)

      if (existing.empty && legacyItems.length > 0) {
        for (let start = 0; start < legacyItems.length; start += 400) {
          if (currentGeneration !== generation) return

          const batch = writeBatch(db)

          legacyItems.slice(start, start + 400).forEach((legacyItem) => {
            const ref = doc(collection(db, collectionName))
            const data = normalize(legacyItem)

            batch.set(ref, {
              ...data,
              uid: user.uid,
              updatedAt: serverTimestamp()
            })
          })

          await batch.commit()
        }
      }

      if (currentGeneration !== generation) return

      localStorage.setItem(migrationFlag, 'true')
    }

    if (currentGeneration !== generation) return

    stopSnapshot = onSnapshot(
      q,
      (snapshot) => {
        if (currentGeneration !== generation) return

        items.value = snapshot.docs
          .map((document) => ({
            ...normalize(document.data()),
            id: document.id
          }))
          .sort((a, b) => b.createdAt - a.createdAt)

        localStorage.setItem(
          storageKey,
          JSON.stringify(items.value)
        )

        ready.value = true
      },
      (error) => {
        console.error(
          `Error leyendo ${collectionName}:`,
          error.code || error.message
        )
      }
    )
  }

  onAuthStateChanged(getAuth(), (user) => {
    generation++
    const currentGeneration = generation

    stopSnapshot?.()
    stopSnapshot = null

    currentUid = user?.uid || null
    items.value = []
    ready.value = false

    if (user) {
      initializeUser(user, currentGeneration).catch((error) => {
        console.error(
          `Error inicializando ${collectionName}:`,
          error.code || error.message
        )
      })
    }
  })

  async function addItem(item) {
    if (!currentUid || !ready.value) {
      console.error('Firestore aún no está listo.')
      return false
    }

    try {
      const data = normalize(item)

      await addDoc(collection(db, collectionName), {
        ...data,
        uid: currentUid,
        updatedAt: serverTimestamp()
      })

      return true
    } catch (error) {
      console.error('Error añadiendo documento:', error.code || error.message)
      return false
    }
  }

  async function updateItem(item) {
    if (!currentUid || !ready.value || !item?.id) return false

    try {
      await updateDoc(doc(db, collectionName, String(item.id)), {
        ...normalize(item),
        updatedAt: serverTimestamp()
      })

      return true
    } catch (error) {
      console.error('Error actualizando documento:', error.code || error.message)
      return false
    }
  }

  async function removeItem(id) {
    if (!currentUid || !ready.value || !id) return false

    try {
      await deleteDoc(doc(db, collectionName, String(id)))
      return true
    } catch (error) {
      console.error('Error eliminando documento:', error.code || error.message)
      return false
    }
  }

  async function clearItems() {
    if (!currentUid || !ready.value) return false

    try {
  
        const snapshot = await getDocs(userQuery(currentUid))

      for (let start = 0; start < snapshot.docs.length; start += 400) {
        const batch = writeBatch(db)

        snapshot.docs.slice(start, start + 400).forEach((document) => {
          batch.delete(document.ref)
        })

        await batch.commit()
      }

      return true
    } catch (error) {
      console.error('Error vaciando colección:', error.code || error.message)
      return false
    }
  }

  return {
    items,
    ready,
    addItem,
    updateItem,
    removeItem,
    clearItems
  }
}
