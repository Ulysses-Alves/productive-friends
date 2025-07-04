import {firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, getDocs, where, query } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const wkDayIsoValue = [7, 1, 2, 3, 4, 5, 6];

//info doesn't presist between pages, use sessionStorage for login to home.

var user;
const currentDate = new Date();
const currentDayNum = currentDate.getDate();
const currentWeekNum = getISOWeekNumber(currentDate);
// const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const tasks = [];

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

onAuthStateChanged(auth, (u) => {
  if(u){
    user = auth.currentUser;
    getTasks("2025-06-28");
    loadInitalText(user.email, currentWeekNum);
    console.log("logged in");
  }
  else{
    console.log("logged out")
  }
});

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

    var day = date.getDate();
    var month = date.getMonth() + 1;

    if(day < 10){
      day = "0" + `${day}`; 
    }
    if(month < 10){
      month = "0" + `${month}`;
    }
      return `${date.getFullYear()}` + "-" + `${month}` + "-" + `${day}`
}

document.getElementById("logout-btn").addEventListener("click", () => {
  logOut();
});

function logOut(){
  signOut(auth)
  .then(() => {
    console.log("User signed out");
    window.location.href = "index.html";
  })
  .catch((error) => {
    console.error("Logout error:", error.message);
  });
}