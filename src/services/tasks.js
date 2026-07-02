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



export const subscribeTasks = (uid, callback) => {
  const q = query(
    collection(db, "tasks"),
    where("uid", "==", uid)
  );

  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })));
  });
};

export const addTask = (uid, title) => {
  return addDoc(collection(db, "tasks"), {
    uid,
    title,
    done: false,
       priority: "low",
    createdAt: Date.now()
  });
};

export const deleteTask = (id) => {
  return deleteDoc(doc(db, "tasks", id));
};

export const updateTask = (task) => {
  const ref = doc(db, "tasks", task.id)

  return updateDoc(ref, {
    title: task.title,
    done: task.done,
    priority: task.priority ?? "low"
  })
}

