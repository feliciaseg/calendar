/** Gets the current date */
let date = new Date();

/** Functions to run on window load */
function timeDateMain() {
    currentTime();
    currentDate();   
}

/**
 * Adds a 0 to single digit values
 * @param {Number} timevalue 
 */
function addZero(timevalue) {
    if (timevalue < 10){
        timevalue = "0" + timevalue;
    }
    return timevalue;
}

/** Sets the current time */
function currentTime(){
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());
    let time = hours + ":" + minutes
    
    // Visa i HTML dokumentet
    let showTime = document.getElementById("showTime")
    showTime.innerHTML = time;
}

/** Updates the time each second */
setInterval(currentTime, 1000) 

/** Sets the current date */
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
    let todaysDate = weekday + "," + "<br> " + month + " " + dayOfTheMonth;

    //Visa det i HTML
    let showDate = document.getElementById("showDate")
    showDate.innerHTML = todaysDate;
}
// Behöver vi ett set-interval här?
