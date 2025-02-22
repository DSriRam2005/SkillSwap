import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHE74drRdvtnp7EMANKRMwmlgm0mnl3Gk",
  authDomain: "skillswap-2abec.firebaseapp.com",
  projectId: "skillswap-2abec",
  storageBucket: "skillswap-2abec.firebasestorage.app",
  messagingSenderId: "628225420889",
  appId: "1:628225420889:web:35ea83070174f232fd4b48",
  measurementId: "G-D5C0EEFRPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signUpUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: user.email,
      createdAt: new Date()
    });

    console.log("User signed up:", user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
};
