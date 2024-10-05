// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDxWeTAIBYM9_WdaMrdQB0QoSCsKEAwEk4",
  authDomain: "kapetearria-web-1a21c.firebaseapp.com",
  projectId: "kapetearria-web-1a21c",
  storageBucket: "kapetearria-web-1a21c.appspot.com",
  messagingSenderId: "873295670671",
  appId: "1:873295670671:web:8c3a65841128b002692ffa",
  measurementId: "G-2BYYNL5KVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, firestore, storage, database };