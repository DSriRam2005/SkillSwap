// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7GiaJ7q3WMhtGvGwU9-ZlGnBQaqWmvcA",
  authDomain: "skillswap-8d6c0.firebaseapp.com",
  projectId: "skillswap-8d6c0",
  storageBucket: "skillswap-8d6c0.firebasestorage.app",
  messagingSenderId: "192123591071",
  appId: "1:192123591071:web:2673fde0106b92289e85aa",
  measurementId: "G-EJEWKNK4VP"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase modules
export { auth, db };
