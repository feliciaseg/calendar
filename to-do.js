
/** Sets function to run on window load */
window.onload = todoMain;

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
    btnAddItem.addEventListener("click", () => addNewItem)
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
    const inputFields = document.querySelectorAll("input")

    // Counter for the amount of filled inputfields
    let correctInput = 0;

    // Sets a red frame around the empty inputfields
    for (i = 0; i < inputFields.length; i++) {
        if (!inputFields[i].value) {
            inputFields[i].style.border = "0.1rem #FF716E solid"
        }
        else {
            inputFields[i].style.border = "none"
            correctInput += 1;
        }
    }

    // Create input if all inputfields are filled
    if (correctInput === inputFields.length) {
        let task = {
            date: document.getElementById("datePicked").value,
            time: document.getElementById ("timePicked").value,
            description: document.getElementById("description").value
        }
        updateLS(task);
        openNewDiv();
    }
    event.preventDefault();
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
        pDate.classList.add("date")
        const pTime = document.createElement("p");
        const pDescription = document.createElement ("p");

        const removeButton = document.createElement("span"); 
        removeButton.classList.add("material-icons");
        removeButton.innerHTML = 'close';

        const editButton = document.createElement("span");
        editButton.classList.add("material-icons");
        editButton.innerHTML = 'edit';
    
         // Append elements
        todoContainer.append(div);
        div.append(pDate);
        div.append(pTime);
        div.append(removeButton);
        div.append(editButton);
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

