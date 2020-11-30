
/** Array to save object (task) in */
let tasks = []

/** Functions to run on window load */
function todoMain() {
    addTodoEventListeners();
    showTodos();
    createNotification();
}

/** Adds event listeners */
function addTodoEventListeners() {
    const btnOpenNewTask = document.getElementById("openNewTask");
    btnOpenNewTask.addEventListener("click", openNewTask);

    const btnAddItem = document.getElementById("addNewItem");
    btnAddItem.addEventListener("click", addNewItem)

    const goBackLink = document.getElementById("goBack")
    goBackLink.addEventListener("click", goBack);

}

/** Functions that run when the "go-back" link is clicked */
function goBack(){
 clearInput();
 showPrimaryDiv();
 changeHeadingToNew();
}

/** Functions that run when the "Add new Item" button in "Primary Content" div is clicked  */
function openNewTask(){
    clearInput();
    showNewTaskDiv();
    showAddNewItemBtn();
}

/** Shows "Primary content" div and hides "New Task" div */
function showPrimaryDiv(){
    const primaryDiv = document.getElementById("primaryContentDiv");
    primaryDiv.classList.remove("none")

    const newTaskDiv = document.getElementById("newTaskDiv");
    newTaskDiv.classList.add("none");
}

/** Shows "New Task" div and hides "Primary Content" div */
function showNewTaskDiv(){
    const newTaskDiv = document.getElementById("newTaskDiv");
    newTaskDiv.classList.remove("none");

    const primaryDiv = document.getElementById("primaryContentDiv");
    primaryDiv.classList.add("none")

    const inputFields = document.querySelectorAll("input")
    // Removes input borders
    for (i = 0; i < inputFields.length; i++) {
        inputFields[i].style.border = "none"
    }
}

/** Shows ''Add new Item'' button */
function showAddNewItemBtn(){
    const addNewItemBtn = document.getElementById("addNewItem");
    addNewItemBtn.classList.remove("none");

    const saveEditsBtn = document.getElementById("saveEditsBtn")
    saveEditsBtn.classList.add("none");
}

/** Shows ''Save Edits'' button */
function showSaveEditsBtn(){
    const saveEditsBtn = document.getElementById("saveEditsBtn")
    saveEditsBtn.classList.remove("none");
    
    const addNewItemBtn = document.getElementById("addNewItem");
    addNewItemBtn.classList.add("none");
}

/** Saves input value from the form */
function addNewItem(event){
    changeHeadingToNew()
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
        showPrimaryDiv();
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
     
    let number= 0; // To add a specific id to each button same as index number
     for (task in savedTasks) {
        const div = document.createElement("div");
        div.classList.add("todo")
        const pDate = document.createElement("p");
        pDate.classList.add("date")
        const pTime = document.createElement("p");
        pTime.classList.add("time")
        const pDescription = document.createElement ("p");
        pDescription.classList.add("description")
        
        const removeButton = document.createElement("span"); 
        removeButton.classList.add("material-icons", "remove");
        removeButton.innerHTML = 'close';
        removeButton.addEventListener("click", function(){
        removeTodo(removeButton);
        })

        const editButton = document.createElement("span");
        editButton.classList.add("material-icons", "editButton", "edit");       
        editButton.setAttribute("id", number++);
        editButton.innerHTML = 'edit';
        editButton.addEventListener("click", function(){
            let buttonID = (editButton).id
            showNewTaskDiv();
            openEditor(buttonID, savedTasks);
            //BUTTONID = INDEX OF CLICKED ELEMENT
        })
    
         // Append elements
        todoContainer.append(div);
        div.append(pTime);
        div.append(removeButton);
        div.append(editButton);
        div.append(pDate);
        div.append(pDescription);
    
         // Text in elements
        pDate.innerHTML = (savedTasks[task].date);
        pTime.innerHTML = (savedTasks[task].time);
        pDescription.innerHTML = (savedTasks[task].description);  
        

        // Styling
        pDate.classList.add("bold", "p-todo");
        pTime.classList.add("bold", "p-todo");
        pDescription.classList.add("p-todo", "normal");
        div.classList.add("div-todo");
        
        createNotification();
    } 
  
} 


 /** Opens 'edit-mode' 
  * @param {number} buttonID
  * @param {Array} savedTasks
 */
function openEditor(buttonID, savedTasks){
    showSaveEditsBtn();
    const saveEditsBtn = document.getElementById("saveEditsBtn")
    changeHeadingToEdit();
    


    //INPUTFIELDS
    const inputFields = document.querySelectorAll("input")
    const inputDescription = document.getElementById("description");
    const inputDate = document.getElementById("datePicked");
    const inputTime = document.getElementById("timePicked");

   
    //PLACEHOLDERS IN INPUTFIELDS
    //BUTTONID = INDEX OF CLICKED ELEMENT
    inputDescription.value = savedTasks[buttonID].description; 
    inputDate.value = savedTasks[buttonID].date;
    inputTime.value = savedTasks[buttonID].time;
    
    
    saveEditsBtn.addEventListener("click", function(){
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

        // Edit todo if all inputfields are filled
        if (correctInput === inputFields.length) {
           savedTasks[buttonID].description = inputDescription.value;
            savedTasks[buttonID].date = inputDate.value;
            savedTasks[buttonID].time = inputTime.value;
    
            // UPDATE LS
            localStorage.setItem("savedTasks", JSON.stringify(savedTasks));

            changeHeadingToNew();
            showTodos();
            createNotification();
            showPrimaryDiv(); 
        }
      
    })

}

/** Changes heading "Edit Task" */
function changeHeadingToEdit(){
    const heading = document.getElementById("heading");
    heading.innerHTML = "Edit Task";
}

/** Changes heading "New Task" */
function changeHeadingToNew(){
    const heading = document.getElementById("heading");
    heading.innerHTML = "New Task";
}


/** Changes to the "saveEditsBtn" */
function changeBtn(){
    const addNewItemBtn = document.getElementById("addNewItem");
    addNewItemBtn.classList.toggle("none");

    const saveEditsBtn = document.getElementById("saveEditsBtn");
    saveEditsBtn.classList.toggle("none");
}


/** Clears all Inputfields */
function clearInput(){
    // Get and clear inputfields
    document.getElementById("description").value = "";
    document.getElementById("datePicked").value = "";
    document.getElementById("timePicked").value = "";
}

/**
 * Removes todo
 * @param {Element} button 
 */
function removeTodo(button) {
    const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    const todos = document.getElementsByClassName("todo")
    
    for (i = 0; i < todos.length; i++) {
        if (button.parentElement === todos[i]) {
            savedTasks.splice(i, 1)
            localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
            showTodos();
            createNotification();
        }
    }
}


