let drag = document.getElementsByClassName("task");
let containers = document.querySelectorAll(".container-item");
let addTaskButton=document.getElementById("addTaskButton")
let input=document.getElementById("addInput")
let todo=document.getElementById("toDoList")

Array.from(drag).forEach((element) => {
    element.addEventListener("dragstart", function (e) {
        this.classList.add("dragStyle");
    });

    element.addEventListener("dragend", function () {
        this.classList.remove("dragStyle");
    });
});

containers.forEach((container) => {
    container.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    container.addEventListener("drop", function (e) {
        e.preventDefault();
        let draggedElement = document.querySelector(".dragStyle");
        if (draggedElement) {
            container.querySelector("ul").appendChild(draggedElement);
        }
    });
});

addTaskButton.addEventListener("click",function(e){
    e.preventDefault();
    const value=input.value
    if(!value){
        return
    }
        const newTask=document.createElement("li")
        newTask.classList.add("task")
        newTask.setAttribute("draggable","true")
        newTask.innerText=value;
        newTask.addEventListener("dragstart",function(e){
            newTask.classList.add("dragStyle")
        })
        newTask.addEventListener("dragend",function(e){
            newTask.classList.remove("dragStyle")
        })
        todo.appendChild(newTask)
        input.value=""

    
})
