

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAph5Xsq9xSZmukpPofQMod0IJhoo7E6yM",
  authDomain: "agenda-inteligente-cdb91.firebaseapp.com",
  projectId: "agenda-inteligente-cdb91",
  storageBucket: "agenda-inteligente-cdb91.firebasestorage.app",
  messagingSenderId: "475077910072",
  appId: "1:475077910072:web:3295ceba1750c8316d90cd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const messagingPromise = isSupported()
  .then((supported) => {
    if (!supported) {
      console.warn("Firebase Messaging no está disponible en este navegador.");
      return null;
    }

    return getMessaging(app);
  })
  .catch((error) => {
    console.warn("No se pudo inicializar Firebase Messaging:", error);
    return null;
  });
