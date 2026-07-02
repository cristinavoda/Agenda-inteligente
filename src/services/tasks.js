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

const tasksRef = collection(db, "tasks");

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
    createdAt: Date.now()
  });
};