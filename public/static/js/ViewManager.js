const tasksSection = document.getElementById("tasks-section");
const descriptionTextArea = document.getElementById("description-textarea");

var currentSelectedTask;

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

        const checkBox = document.createElement("img");
        checkBox.style.cursor = "pointer";
        checkBox.src = 'static/img/bx-checkbox.svg';

        const taskBtns = document.createElement("div");
        taskBtns.id = "task-btns";
        taskBtns.append(edit, checkBox)

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

function loadSelectors(currentWeekNum, totalWeekNum, currentDay, weekDays){
    const weekSelector = document.getElementById("week-num-selector");
    const daySelector = document.getElementById("day-selector");

    for(let i = 1; i <= totalWeekNum; i++){
        const option = document.createElement("option");
        option.value = `Week-${i}`;
        option.textContent = `Week-${i}`;
        weekSelector.appendChild(option);
    }

    weekDays.forEach((date) => {
        const option = document.createElement("option");
        option.value = date.toLocaleDateString("pt-BR", {weekday: "short"});
        option.textContent = date.toLocaleDateString("pt-BR", {weekday: "short"});
        daySelector.appendChild(option);
    });

    // daySelector.value = ;
    weekSelector.value = `Week-${currentWeekNum}`;
}