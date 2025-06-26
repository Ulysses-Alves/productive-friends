const loggedUser = document.getElementById("logged-user");
const selectedWeek = document.getElementById("selected-week");

const contentContainer = document.getElementById("content-container");
const tasksSection = document.getElementById("tasks-section");
const descriptionTextArea = document.getElementById("description-textarea");



function loadUsers(user){
    loggedUser.textContent = user;
}

function loadDates(weekNum){
    selectedWeek.textContent = "Week " + weekNum;
}

//display data
// display description of first task
// make in visible which task is selected

function loadTasks(userTasks){
    const taskList = document.createElement("div");
    taskList.classList.add("task-list");

    userTasks.forEach( (task, i) => {
        const taskElement = document.createElement("button");

        if(i == 0){
            taskElement.classList.add("selected");
            descriptionTextArea.value = task.description;
        }

        const edit = document.createElement("img");
        edit.style.cursor = "pointer";
        edit.src = 'static/img/bx-edit.svg';
        
        const desc = document.createElement("img");
        desc.style.cursor = "pointer";
        desc.src = 'static/img/bx-detail.svg';

        const checkBox = document.createElement("img");
        checkBox.style.cursor = "pointer";
        checkBox.src = 'static/img/bx-checkbox.svg';

        const taskBtns = document.createElement("div");
        taskBtns.id = "task-btns";
        taskBtns.append(edit, desc, checkBox)

        taskElement.textContent = task.title;
        taskElement.classList.add("test-border", "task", "p-1");
        taskElement.append(taskBtns);
        taskList.append(taskElement);
    });

    tasksSection.append(taskList);
}