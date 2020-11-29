
/** Sets function to run on window load */
window.onload = todoMain;

/** Functions to run on window load */
function todoMain() {
    addTodoEventListeners();
    showTodos();
    createNotification();
}

/** Adds event listeners */
function addTodoEventListeners() {
    const btnOpenNewTask = document.getElementById("openNewTask");
    btnOpenNewTask.addEventListener("click", openNewDiv);

    const btnAddItem = document.getElementById("addNewItem");
    btnAddItem.addEventListener("click", addNewItem)


    const goBackLink = document.getElementById("goBack")
    goBackLink.addEventListener("click", goBack);

}

function goBack(){
    clearInput();
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
     
    let number= 0;
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

        removeButton.addEventListener("click", function() {
        removeTodo(removeButton)
        })


        const editButton = document.createElement("span");
        editButton.classList.add("material-icons", "editButton", "edit");       
        editButton.setAttribute("id", number++);
        editButton.innerHTML = 'edit';
        editButton.addEventListener("click", function (){
            let buttonID = (editButton).id
            openNewDiv();
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
        

        //Styling
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
    changeBtn();
    saveEditsBtn = document.getElementById("saveEditsBtn")
    //INPUTFIELDS
  
    const inputDescription = document.getElementById("description");
    const inputDate = document.getElementById("datePicked");
    const inputTime = document.getElementById("timePicked");

   
    //PLACEHOLDERS IN INPUTFIELDS
    //BUTTONID = INDEX OF CLICKED ELEMENT
    inputDescription.value = savedTasks[buttonID].description 
    inputDate.value = savedTasks[buttonID].date
    inputTime.value = savedTasks[buttonID].time
    
    
    // SAVES NEW INPUT
    saveEditsBtn.addEventListener("click", function (){
    
    savedTasks[buttonID].description = inputDescription.value
    savedTasks[buttonID].date = inputDate.value
    savedTasks[buttonID].time = inputTime.value

    // UPDATE LS
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
    openNewDiv();
    showTodos();
    createNotification();
    
    
})
}

/** Changes to the "saveEditsBtn" */
function changeBtn(){
    const addNewItemBtn = document.getElementById("addNewItem");
    addNewItemBtn.classList.toggle("none");

    const saveEditsBtn = document.getElementById("saveEditsBtn");
    saveEditsBtn.classList.toggle("none");

}

function clearInput() {
    //Get and clear inputfields
    document.getElementById("description").value = "";
    document.getElementById("datePicked").value = "";
    document.getElementById("timePicked").value = "";

}

function removeTodo(button) {
    const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    const todos = document.getElementsByClassName("todo")
    
    console.log(button.parentElement)
    for (i = 0; i < todos.length; i++) {
        if (button.parentElement === todos[i]) {
            savedTasks.splice(i, 1)
            localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
            showTodos();
            createNotification();
        }
    }
}


