

 //Selektorer

const btnAddNewItem = document.getElementById("addNewItem"); //Knappen för att lägga in input till en ny ''Todo''
const btnOpenNewTask = document.getElementById("openNewTask");


//Event listeners
btnOpenNewTask.addEventListener("click", openNewTaskDiv)
btnAddNewItem.addEventListener ("click", addToDo)



// //Functions

const newTaskDiv = document.getElementById("newTaskDiv");
const primaryContentDiv = document.getElementById("primaryContentDiv")

//Funktion för att öppna ''new task''diven. Steg 1.
function openNewTaskDiv(){
   
    if (newTaskDiv.classList.contains("none")){
        newTaskDiv.classList.remove("none");
        primaryContentDiv.classList.add("none");
     }
     
}

//Funktion för att spara value( dvs inputen som läggs i formuläret)
let tasks = [] //Array för att spara inputen i
 function addToDo(event) {
    
    event.preventDefault(); //För att stoppa sidan från att ladda om vid tryck på knappen
    //Nedan objektet som görs för nytt input. 
    let task = { 
        date: document.getElementById("datePicked").value,
        time: document.getElementById ("timePicked").value,
        description: document.getElementById("description").value
    }
    tasks.push(task); //pushar in objektet i arrayen.
    
    // Spara i local storage 
    localStorage.setItem("savedTasks", JSON.stringify(tasks));
    
    openPrimaryContentDiv();
}

 // Funktion för att "framsidan"

function openPrimaryContentDiv(){
    if (primaryContentDiv.classList.contains("none")){
        primaryContentDiv.classList.remove("none");
        newTaskDiv.classList.add("none");
    } 
    
}

// Funktion för att visa sparat i Local storage

 function showTodos() {
    
    //Hämtar från från LS
    let savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    
    const todoContainer = document.getElementById("todos");
    //hämta containern

    for (task in tasks) {
        //skapar element.. 
        const div = document.createElement("div");
        const pTime = document.createElement("p");
        const pDescription = document.createElement ("p");

        // appendar element till varandra
        todoContainer.append(div)
        div.append(pTime);
        div.append(pDescription);

        // vad som ska stå i elementen
        pTime.innerHTML = (tasks[task].time);
        pDescription.innerHTML = (tasks[task].description);
    }

 }