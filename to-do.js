
 //Selektorer
const timePicked = document.getElementById("timePicked");
const datePicked = document.getElementById("datePicked");
const description = document.getElementById("description");
const btnAddNewItem = document.getElementById("addNewItem"); //Knappen för att lägga in input till en ny ''Todo''
const toDoList = document.getElementById("to-do-list");
const btnOpenNewTask = document.getElementById("openNewTask");
const newTaskDiv = document.getElementById("newTaskDiv");
const primaryContentDiv = document.getElementById("primaryContentDiv")



//Event listeners

btnOpenNewTask.addEventListener('click', openNewTaskDiv)


// //Functions

 function openNewTaskDiv(){
     if (newTaskDiv.classList.contains('none')){
         newTaskDiv.classList.remove('none');
         primaryContentDiv.classList.add('none');
     }

 }

