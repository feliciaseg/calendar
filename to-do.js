
/** Sets function to run on window load */
window.onload = todoMain;

/** Functions to run on window load */
function todoMain() {
    addEventListeners();
    showTodos();
}

/** Adds event listeners */
function addEventListeners() {
    const btnOpenNewTask = document.getElementById("openNewTask");
    btnOpenNewTask.addEventListener("click", openNewDiv);

    const btnAddItem = document.getElementById("addNewItem");
    btnAddItem.addEventListener("click", addNewItem)
}


/** Displays or hide the divs*/
function openNewDiv(){
    newTaskDiv = document.getElementById("newTaskDiv")
    primaryDiv =  document.getElementById("primaryContentDiv")

    newTaskDiv.classList.toggle("none");
    primaryDiv.classList.toggle("none");
}


/** Saves input value from the form */
let tasks = []
function addNewItem(event){
    event.preventDefault();
    
    let task = {
        date: document.getElementById("datePicked").value,
        time: document.getElementById ("timePicked").value,
        description: document.getElementById("description").value
    }
    tasks.push(task);
    localStorage.setItem("savedTasks", JSON.stringify(tasks));
    saveToLS();
    openNewDiv();
}

/** Saves the input to Local Storage */
function saveToLS() {
    localStorage.setItem("savedTasks", JSON.stringify(tasks));
    showTodos();
}

/** Empties the todo container*/
function emptyTodoContainer(){
    const container = document.getElementById ("todos");
    let containerChildren = container.children;
   
    while (containerChildren.length > 0) {
        containerChildren[0].remove()
    }

}

/** Shows all saved tasks/todos */
function showTodos() {
     emptyTodoContainer();

     const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
     const todoContainer = document.getElementById("todos");
     
     for (task in savedTasks) {
        const div = document.createElement("div");
        const pTime = document.createElement("p");
        const pDescription = document.createElement ("p");
    
         // appendar element till varandra
        todoContainer.append(div);
        div.append(pTime);
        div.append(pDescription);
    
         // vad som ska stå i elementen
        pTime.innerHTML = (savedTasks[task].time);
        pDescription.innerHTML = (savedTasks[task].description);  
    } 
  
} 

