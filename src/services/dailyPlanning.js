
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


export const subscribeDailyActivities = (uid, date, callback) => {
  const q = query(
    collection(db, "dailyActivities"),
    where("uid", "==", uid),
    where("date", "==", date)
  );

  return onSnapshot(q, (snapshot) => {
    const activities = snapshot.docs.map(document => ({
      id: document.id,
      ...document.data()
    }));

    activities.sort((a, b) =>
      (a.order ?? 0) - (b.order ?? 0)
    );

    callback(activities);
  });
};

export const addDailyActivity = (uid, date, activity) => {
  return addDoc(collection(db, "dailyActivities"), {
    uid,
    date,
    time: activity.time,
    title: activity.title,
    priority: activity.priority ?? "low",
    done: false,
    order: activity.order ?? Date.now(),
    createdAt: Date.now()
  });
};


export const updateDailyActivity = (activity) => {
  return updateDoc(
    doc(db, "dailyActivities", activity.id),
    {
      time: activity.time,
      title: activity.title,
      priority: activity.priority,
      done: activity.done,
      order: activity.order
    }
  );
};


export const updateDailyActivityOrder = (id, order) => {
  return updateDoc(doc(db, "dailyActivities", id), {
    order
  });
};


export const deleteDailyActivity = (id) => {
  return deleteDoc(doc(db, "dailyActivities", id));
};
