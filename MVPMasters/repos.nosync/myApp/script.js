let containers = document.querySelectorAll(".container-item");
let addTaskButton = document.getElementById("addTaskButton");
let input = document.getElementById("addInput");
let todo = document.getElementById("toDoList");
let inProgress = document.getElementById("inProgressList");
let done = document.getElementById("doneList");

loadContent();

function loadContent() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || { todo: [], inProgress: [], done: [] };
    tasks.todo.forEach(task => addNewTask(task, todo));
    tasks.inProgress.forEach(task => addNewTask(task, inProgress));
    tasks.done.forEach(task => addNewTask(task, done));
}

function saveTasks() {
    const tasks = {
        todo: [],
        inProgress: [],
        done: []
    };

    document.querySelectorAll("#toDoList .task").forEach(task => {
        tasks.todo.push(task.innerText.replace("Delete", "").trim());
    });

    document.querySelectorAll("#inProgressList .task").forEach(task => {
        tasks.inProgress.push(task.innerText.replace("Delete", "").trim());
    });

    document.querySelectorAll("#doneList .task").forEach(task => {
        tasks.done.push(task.innerText.replace("Delete", "").trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addNewTask(taskValue, list) {
    const newTask = document.createElement("li");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = taskValue;

    const btn = document.createElement("button");
    btn.classList.add("btnDelete");
    btn.innerText = "Delete";
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        newTask.remove();
        saveTasks();
    });

    newTask.appendChild(btn);
    newTask.addEventListener("dragstart", function (e) {
        newTask.classList.add("dragStyle");
    });

    newTask.addEventListener("dragend", function (e) {
        newTask.classList.remove("dragStyle");
    });

    list.appendChild(newTask);
}

addTaskButton.addEventListener("click", function (e) {
    e.preventDefault();
    const value = input.value;
    if (!value) {
        return;
    }
    addNewTask(value, todo);
    saveTasks();
    input.value = "";
});

containers.forEach(container => {
    container.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    container.addEventListener("drop", function (e) {
        e.preventDefault();
        let draggedElement = document.querySelector(".dragStyle");
        if (draggedElement) {
            container.querySelector("ul").appendChild(draggedElement);
            saveTasks();
        }
    });
});
