// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getAnalytics } from "firebase/analytics";

// Firebase configuration (keep your credentials secure)
const firebaseConfig = {
  apiKey: "AIzaSyDxWeTAIBYM9_WdaMrdQB0QoSCsKEAwEk4",
  authDomain: "kapetearria-web-1a21c.firebaseapp.com",
  databaseURL: "https://kapetearria-web-1a21c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kapetearria-web-1a21c",
  storageBucket: "kapetearria-web-1a21c.appspot.com",
  messagingSenderId: "873295670671",
  appId: "1:873295670671:web:8c3a65841128b002692ffa",
  measurementId: "G-2BYYNL5KVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
const database = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication

// Export the initialized services
export { app, analytics, database, auth };
export default app;
