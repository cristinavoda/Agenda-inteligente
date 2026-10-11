
import { db } from "../firebase";

import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

// Recuperar las tareas ordenadas
export const subscribeTasks = (uid, callback) => {
  const q = query(
    collection(db, "tasks"),
    where("uid", "==", uid)
  );

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(document => ({
      id: document.id,
      ...document.data()
    }));

    tasks.sort((a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) -
      (b.order ?? Number.MAX_SAFE_INTEGER)
    );

    callback(tasks);
  });
};

// Añadir una tarea
export const addTask = (uid, title) => {
  return addDoc(collection(db, "tasks"), {
    uid,
    title,
    done: false,
    priority: "low",
    order: Date.now(),
    createdAt: Date.now()
  });
};

// Eliminar una tarea
export const deleteTask = (id) => {
  return deleteDoc(doc(db, "tasks", id));
};

// Actualizar una tarea
export const updateTask = (task) => {
  const ref = doc(db, "tasks", task.id);

  return updateDoc(ref, {
    title: task.title,
    done: task.done,
    priority: task.priority ?? "low"
  });
};

// Guardar la posición de una tarea
export async function updateTaskOrder(id, order) {
  await updateDoc(doc(db, "tasks", id), {
    order: order
  });
}
