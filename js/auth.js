import { auth, db } from "../firebase-config.js";
import { 
    createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider, signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const googleProvider = new GoogleAuthProvider();

// Signup
document.getElementById("signUpBtn")?.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: user.email
        });

        alert("Signup successful!");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});

// Login
document.getElementById("loginBtn")?.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});

// Google Login
document.getElementById("googleLoginBtn")?.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email
        }, { merge: true });

        alert("Google login successful!");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});

// Logout
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
});
