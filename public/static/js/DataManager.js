import {firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, getDocs, where, query } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const wkDayIsoValue = [7, 1, 2, 3, 4, 5, 6];

//info doesn't presist between pages, use sessionStorage for login to home.

const user = "Ulysses";
const currentDate = new Date();
const currentDayNum = currentDate.getDate();
const currentWeekNum = getISOWeekNumber(currentDate);
// const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const tasks = [];

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

async function getTasks(date) {
  const querySnapshot = await getDocs(query(collection(db, "tasks"), where("date", "==", date)));

  querySnapshot.forEach((doc) => {
    tasks.push(doc.data());
  });
  loadTasks(tasks);
}

function getISOWeekNumber(date) {
    const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = tempDate.getUTCDay() || 7;
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

  function getDateString(date) {

    let day = date.getDate();
    let month = date.getMonth() + 1;

    if(day < 10){
      day = "0" + `${day}`; 
    }
    if(month < 10){
      month = "0" + `${month}`;
    }
      return `${date.getFullYear()}` + "-" + `${month}` + "-" + `${day}`
}

document.getElementById("login-btn").addEventListener("click", () => {
  submitCred();
});

document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth)
  .then(() => {
    console.log("User signed out");
  })
  .catch((error) => {
    console.error("Logout error:", error.message);
  });
});

function submitCred(){
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      user.getIdToken().then((token) => {
        
      })
      .catch((error) => {
        console.log("Login error: ", error.message);
      });
    });
}

// document.addEventListener("DOMContentLoaded", () => {
//   // loadUsers(user);
//   // loadDates(currentWeekNum);
//   // getTasks("2025-06-24");
// });