
import { db } from '../firebase'
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'


export const subscribeAgendaEvents = (uid, callback, onError) => {
  const q = query(
    collection(db, 'events'),
    where('uid', '==', uid)
  )

  return onSnapshot(
    q,
    (snapshot) => {
      const events = snapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
      }))

      callback(events)
    },
    (error) => {
      console.error('Error al escuchar la agenda:', error)
      onError?.(error)
    }
  )
}


export const addAgendaEvent = (uid, event) => {
  return addDoc(collection(db, 'events'), {
    uid,
    title: event.title,
    start: event.start,
    end: event.end ?? null,
    reminder: event.reminder ?? 0,
    priority: event.priority ?? 'medium',
    backgroundColor: event.backgroundColor ?? '#f59e0b',
    createdAt: Date.now()
  })
}


export const updateAgendaEvent = (event) => {
  const { id, title, start, end, reminder,
    priority, backgroundColor } = event

  return updateDoc(doc(db, 'events', String(id)), {
    title,
    start,
    end: end ?? null,
    reminder: reminder ?? 0,
    priority: priority ?? 'medium',
    backgroundColor: backgroundColor ?? '#f59e0b'
  })
}


export const deleteAgendaEvent = (id) => {
  return deleteDoc(doc(db, 'events', String(id)))
}
