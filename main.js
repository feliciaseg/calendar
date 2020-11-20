
var dateControl = document.querySelector('input[type="date"]');
dateControl.value = '2017-06-01';
console.log(dateControl.value); // prints "2017-06-01"
console.log(dateControl.valueAsNumber); // prints 1496275200000, a JavaScript timestamp (ms)

var timeControl = document.querySelector('input[type="time"]');
timeControl.value = '15:30';

window.addEventListener ("load", main)

function main() {
    currentTime();
    currentDate();
    
}

let date = new Date();

//Funktionen läggs till eftersom t.ex 07:03 visas som 7:3, därför behöver vi lägga till en 0:a
function addZero(timevalue) {
    if (timevalue < 10){
        timevalue = "0" + timevalue;
    }
    return timevalue;
}

function currentTime(){
    
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());
    let time = hours + ":" + minutes
    
    //Visa i HTML dokumentet
    let showTime = document.getElementById("showTime")
    showTime.innerHTML = time;
}
setInterval (currentTime, 1000) 



function currentDate(){
    
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
// Behöver vi ett set-interval här?
