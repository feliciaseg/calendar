/** Functions to run on window load */
function todoMain() {
    addTodoEventListeners();
    showTodos();
}

/** Adds event listeners */
function addTodoEventListeners() {
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
    // tasks.push(task);
    
    updateLS(task);
    openNewDiv();
}

/** Updates local storage */
function updateLS(task) {
    if (localStorage.getItem('savedTasks')) {
    tasks = JSON.parse(localStorage.getItem('savedTasks'));
    }
    tasks.push(task);
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
        const pDate = document.createElement("p");
        const pTime = document.createElement("p");
        const pDescription = document.createElement ("p");
    
         // Append elements
        todoContainer.append(div);
        div.append(pDate);
        div.append(pTime);
        div.append(pDescription);
    
         // Text in elements
        pDate.innerHTML = (savedTasks[task].date);
        pTime.innerHTML = (savedTasks[task].time);
        pDescription.innerHTML = (savedTasks[task].description);  
        
        //Styling
        pDate.classList.add("bold", "p-todo");
        pTime.classList.add("semi-bold", "p-todo");
        pDescription.classList.add("p-todo");
        div.classList.add("div-todo");
        
        createNotification();
    } 
  
} 

