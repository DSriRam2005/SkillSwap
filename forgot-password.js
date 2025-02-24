import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

document.getElementById('forgot-password-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.querySelector('input[name="email"]').value;

  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset email sent. Please check your inbox.');
    window.location.href = 'https://mail.google.com/mail/u/0/#inbox';
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    alert('Error sending password reset email. Please try again.');
  }
});
