import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAph5Xsq9xSZmukpPofQMod0IJhoo7E6yM",
  authDomain: "agenda-inteligente-cdb91.firebaseapp.com",
  projectId: "agenda-inteligente-cdb91",
  storageBucket: "agenda-inteligente-cdb91.firebasestorage.app",
  messagingSenderId: "475077910072",
  appId: "1:475077910072:web:3295ceba1750c8316d90cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);