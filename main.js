window.addEventListener ("load", main)

function main() {
    currentTime();
    currentDate();
}

//Funktionen läggs till eftersom t.ex 07:03 visas som 7:3, därför behöver vi lägga till en 0:a
function addZero(a) {
    if (a < 10){
        a = "0" + a;
    }
    return a;
}

function currentTime(){
    // Jag har let date variabeln i function-scopet istället för det globala, ska jag ändra det?
    let date = new Date();

    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());
    let time = hours + ":" + minutes
    
    //Visa i HTML dokumentet
    let showTime = document.getElementById("showTime")
    showTime.innerHTML = time;
}
setInterval (currentTime, 1000) 
// Kommentera gärna här ovan om jag kan skriva setInterval funktionen på annat sätt, med längre tid eller liknande 


function currentDate(){
    let date = new Date();

    // Veckodagen
    let NumberOfday = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let weekday = (days[NumberOfday]);
    
    //Månaden
    let NumberOfmonth = date.getMonth();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = (months[NumberOfmonth]);
    
    // Dagen i månaden
    let dayOfTheMonth = date.getDate();
    
    //Allting tillsammans
    let todaysDate = weekday + "," + " " + month + " " + dayOfTheMonth;

    //Visa det i HTML
    let showDate = document.getElementById("showDate")
    showDate.innerHTML = todaysDate;
}

// Behöver jag ett set-interval här?


