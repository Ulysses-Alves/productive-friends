const loggedUser = document.getElementById("logged-user");
const selectedWeek = document.getElementById("selected-week");

const contentContainer = document.getElementById("content-container");
const tasksSection = document.getElementById("tasks-section");
const descriptionTextArea = document.getElementById("description-textarea");

let currentSelectedTask;

function loadUsers(user){
    loggedUser.textContent = user;
}

function loadDates(weekNum){
    selectedWeek.textContent = "Week " + weekNum;
}

function selectTask(task){
    currentSelectedTask.dataset.selected = false;
    task.dataset.selected = true;
    currentSelectedTask = task;
}

function loadDesc(taskDesc){
    descriptionTextArea.value = taskDesc;
}

function loadTasks(userTasks){

    const taskList = document.createElement("div");
    taskList.classList.add("task-list");

    userTasks.forEach( (task, i) => {
        const taskElement = document.createElement("button");

        if(i == 0){
            taskElement.dataset.selected = true;
            currentSelectedTask = taskElement;
            descriptionTextArea.value = task.description;
        }
        else{
            taskElement.dataset.selected = false;
        }

        taskElement.addEventListener("click", () => {
            selectTask(taskElement);
            loadDesc(task.description);
        });

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
        taskElement.classList.add("task", "p-1");
        taskElement.style.cursor = "pointer";
        taskElement.append(taskBtns);
        taskList.append(taskElement);
    });

    tasksSection.append(taskList);
}