import {firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, getDocs, where, query } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

//Firebase variables

const tasks = [];
var user;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//Date logic related variables

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentWkDay = currentDate.getDate();
// const totalNumOfWK = ;
const currentWkNum = getISOWeekNumber(currentDate);
const daysOfWk = getDatesFromWeekNum(currentWkNum, 2025);

//Listeners 

document.getElementById("logout-btn").addEventListener("click", () => {
  logOut();
});

//Firebase related functions

onAuthStateChanged(auth, (u) => {
  if(u){
    user = auth.currentUser;
    getTasks("2025-06-28");

    Promise.all([
      typeText("username-display", "user-cursor", user.email),
      loadSelectors(currentWkNum, 52, 6, daysOfWk)
    ]);

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

// Date related functions

function getISOWeekNumber(date) {
    const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = tempDate.getUTCDay() || 7;
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    const weekNum = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
    return weekNum;
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

//Look into how this works
function getDatesFromWeekNum(weekNum, year){
  const simple = new Date(year,0,1 + (weekNum - 1) * 7);
  const dayOfWeek = simple.getDay();
  const ISOweekStart = new Date(simple);

  const diffToMonday = (dayOfWeek <= 4 ? dayOfWeek -1 : dayOfWeek - 8);

  ISOweekStart.setDate(simple.getDate() - diffToMonday);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(ISOweekStart);
    date.setDate(ISOweekStart.getDate() + i);
    weekDates.push(date);
  }

  return weekDates
}

//create function for getting the total weeks of a year