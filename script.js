import { initializeApp } from "firebase/app";
import { 
  getAuth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Sign-Up Function
const signUpUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: user.email,
      createdAt: new Date()
    });

    console.log("User signed up:", user);
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

// Login Function
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
};

// Logout Function
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
    window.location.href = "index.html"; // Redirect to login page
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

// Check User Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user);
  } else {
    console.log("No user logged in");
  }
});

// Export functions
export { signUpUser, loginUser, logoutUser };

