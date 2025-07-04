import {firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function submitCred(){
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        window.location.href = "home.html";
    });
}

document.getElementById("login-btn").addEventListener("click", () => {
    submitCred();
  });