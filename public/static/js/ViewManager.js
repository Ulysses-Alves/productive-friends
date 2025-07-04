const loggedUser = document.getElementById("logged-user");
const selectedWeek = document.getElementById("selected-week");

const contentContainer = document.getElementById("content-container");
const tasksSection = document.getElementById("tasks-section");
const descriptionTextArea = document.getElementById("description-textarea");

var currentSelectedTask;

function loadInitalText(email, week){
    Promise.all([
        typeText("logged-user", "user-cursor", email),
        typeText("selected-week", "week-cursor", "Week " + week)
    ])
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

async function typeText(elementId, cursorId, text){
    const target = document.getElementById(elementId);
    const cursor = document.getElementById(cursorId);

    target.textContent = "";

    for(let i = 0; i < text.length; i++){
        target.textContent += text[i];
        await new Promise(resolve => setTimeout(resolve, 60));
    }

    cursor.style.display = "none";
}