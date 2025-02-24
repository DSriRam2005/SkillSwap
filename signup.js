import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAr7LOMEhpXz0S9MXuTyqvhCY0dZhsEL2g",
  authDomain: "login-2de66.firebaseapp.com",
  projectId: "login-2de66",
  storageBucket: "login-2de66.appspot.com",
  messagingSenderId: "704627594925",
  appId: "1:704627594925:web:f69ef29fc0004115f1d824"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const name = signupForm.elements["name"].value;
  const email = signupForm.elements["email"].value;
  const password = signupForm.elements["password"].value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Update the user's profile with the name
      updateProfile(user, {
        displayName: name
      }).then(() => {
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
        console.error("Error updating profile:", error);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during sign-up:", errorCode, errorMessage);
    });
});