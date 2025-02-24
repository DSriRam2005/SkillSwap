import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAr7LOMEhpXz0S9MXuTyqvhCY0dZhsEL2g",
  authDomain: "login-2de66.firebaseapp.com",
  projectId: "login-2de66",
  storageBucket: "login-2de66.firebasestorage.app",
  messagingSenderId: "704627594925",
  appId: "1:704627594925:web:f69ef29fc0004115f1d824"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      // Store user information in local storage
      localStorage.setItem('user', JSON.stringify({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }));
      // Redirect to home.html
      window.location.href = "home.html";
    }).catch((error) => {
      if (error.code === 'auth/too-many-requests') {
        alert('Too many login attempts. Please try again later.');
      } else if (error.code === 'auth/network-request-failed') {
        alert('Network error. Please check your connection and try again.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email format. Please check and try again.');
      } else {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during sign-in:", errorCode, errorMessage);
      }
    });
});

// Function to handle login
async function handleLogin(event) {
  event.preventDefault();
  const email = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Signed in successfully:', user);
    // Store user information in local storage
    localStorage.setItem('user', JSON.stringify({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }));
    // Redirect to home.html
    window.location.href = "home.html";
  } catch (error) {
    if (error.code === 'auth/too-many-requests') {
      alert('Too many login attempts. Please try again later.');
    } else if (error.code === 'auth/network-request-failed') {
      alert('Network error. Please check your connection and try again.');
    } else if (error.code === 'auth/invalid-email') {
      alert('Invalid email format. Please check and try again.');
    } else if (error.code === 'auth/wrong-password') {
      alert('Incorrect password. Please try again.');
    } else if (error.code === 'auth/user-not-found') {
      alert('No user found with this email. Please check and try again.');
    } else {
      console.error('Error during sign-in:', error.message);
      alert('Invalid login credentials. Please try again.');
    }
  }
}

document.getElementById('login-form').addEventListener('submit', handleLogin);