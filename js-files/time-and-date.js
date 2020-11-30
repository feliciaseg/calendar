
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
    let date = new Date();
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());
    let time = hours + ":" + minutes
    
    //Show in div
    let showTime = document.getElementById("showTime")
    showTime.innerHTML = time;
}

/** Updates the time each second */
setInterval(currentTime, 1000) 


/** Sets the current date */
function currentDate(){
    /** Gets the current date */
    let date = new Date();
    
    // Weekday
    let NumberOfday = date.getDay();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let weekday = (days[NumberOfday]);
    
    //Month
    let NumberOfmonth = date.getMonth();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = (months[NumberOfmonth]);
    
    // Day of month
    let dayOfTheMonth = date.getDate();
    
    //All together
    let todaysDate = weekday + "," + "<br> " + month + " " + dayOfTheMonth;

    //Show
    let showDate = document.getElementById("showDate")
    showDate.innerHTML = todaysDate;
}

