import {firebaseConfig} from "./firebaseConfig";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const wkDayIsoValue = [7, 1, 2, 3, 4, 5, 6];

const user = "Ulysses";
const currentDate = new Date();
const currentDayNum = currentDate.getDate();
const currentWeekNum = getISOWeekNumber(currentDate);
// const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

document.addEventListener("DOMContentLoaded", () => {
  loadUsers(user);
  loadDates(currentWeekNum);
  loadTasks(userWeekData.taskList);
});



firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

db.collection("tasks").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }).catch((error) => {
    console.error("Error getting tasks:", error);
  });

function getISOWeekNumber(date) {
    const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = tempDate.getUTCDay() || 7; // Make Sunday = 7
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((tempDate - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  }

  const userData = {
    name: "Ulysses",
    friendsList: ["uid_1","uid_2"],
    followedFriends: ["uid_1"],
};

const userWeekData = {
    queriedWeek: 25,
    taskList: [
        {   
            taskId: 22,
            owner: "uid_3",
            title: "Code task creator",
            description: "Create a way for the user to create new tasks. Hide note section, show task creator form.",
            isComplete: false,
            date: "2025-06-20", // ISO date?
            week: 25,
            year: 2025
        },
        {   
            taskId: 23,
            owner: "uid_3",
            title: "Read Book",
            description: "Read a chapter of Elric of Melnibone",
            isComplete: false,
            date: "2025-06-20", // ISO date?
            week: 25,
            year: 2025
        },
        {   taskId: 24,
            owner: "uid_3",
            title: "Understand lowLevelSystemSDL.cpp",
            description: "continue going through the source code to understand how the engine initializes. Write notes.",
            isComplete: false,
            date: "2025-06-20", // ISO date?
            week: 25,
            year: 2025
        },
        {   taskId: 25,
            owner: "uid_3",
            title: "Study anatomy",
            description: "Focus on learning leg anatomy, main muscles in different angles. How do they look foreshortened",
            isComplete: false,
            date: "2025-06-20", // ISO date?
            week: 25,
            year: 2025
        },
        {   taskId: 26,
            owner: "uid_3",
            title: "Watch King Kong",
            description: "",
            isComplete: false,
            date: "2025-06-20", // ISO date?
            week: 25,
            year: 2025
        },
    ]
}