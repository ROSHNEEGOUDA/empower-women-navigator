// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2hk5fHo_zI4VBVOpywHzCmQeCHvC4HB4",
  authDomain: "wwt01-94e33.firebaseapp.com",
  projectId: "wwt01-94e33",
  storageBucket: "wwt01-94e33.firebasestorage.app",
  messagingSenderId: "848153454424",
  appId: "1:848153454424:web:30aed9eeae35df5bd5672d",
  measurementId: "G-FP0QM4MBY1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const user = auth.currentUser;
export const db = getFirestore(app);
