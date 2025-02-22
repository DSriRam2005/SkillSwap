import { auth, db } from "../firebase-config.js";
import { 
    createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signInWithPopup, GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Signup Function
document.getElementById("signUpBtn")?.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), { name, email });
        alert("Signup successful!");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});

// Login Function
document.getElementById("loginBtn")?.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

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
