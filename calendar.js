/** Varibles which set the current day, month and year */
const todaysDate = new Date();
let day = todaysDate.getDate();
let month = todaysDate.getMonth() + 1;
let year = todaysDate.getFullYear();

/** Sets function to run on window load */
window.onload = main;

/** Functions to run on window load */
async function main() {
    getSvenskaDagarApi();
    addEventListeners();
    setYearInterval();
}

/** Adds event listeners */
function addEventListeners() {
    const previousMonth = document.getElementById("month-button-previous");
    const nextMonth = document.getElementById("month-button-next");

    previousMonth.addEventListener("click", () => changeMonth(previousMonth));
    nextMonth.addEventListener("click", () => changeMonth(nextMonth));
}

/** Gets and forwards the result of fetching Svenska Dagar Api */
async function getSvenskaDagarApi() {
    const previousMonthsData = await getApiForPreviousMonth();
    const currentMonthsData = await getApiForCurrentMonth();
    const nextMonthsData = await getApiForNextMonth();

    addFillerDivsBeforeCalendarDays(currentMonthsData, previousMonthsData);
    createCalendarDays(currentMonthsData);
    addFillerDivsAfterCalendarDays(nextMonthsData);
}

/** Fetches Svenska Dagar Api for the previous month */
async function getApiForPreviousMonth() {
    let previousMonth = month - 1;
    let yearForPreviousMonth = year;
    if (previousMonth === 0 ) {
        previousMonth = 12;
        yearForPreviousMonth = year - 1;
    }

    try {
        const result = await fetch("https://sholiday.faboul.se/dagar/v2.1/" + yearForPreviousMonth + "/" + previousMonth)
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.error(error)
    }
}

/** Fetches Svenska Dagar Api for the current month */
async function getApiForCurrentMonth() {
    try {
        const result = await fetch("https://sholiday.faboul.se/dagar/v2.1/" + year + "/" + month)
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.error(error)
    }
}

/** Fetches Svenska Dagar Api for the next month */
async function getApiForNextMonth() {
    let nextMonth = month + 1;
    let yearForNextMonth = year;
    if (nextMonth === 13 ) {
        nextMonth = 1;
        yearForNextMonth = year + 1;
    }
    try {
        const result = await fetch("https://sholiday.faboul.se/dagar/v2.1/" + yearForNextMonth + "/" + nextMonth)
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.error(error)
    }
}

/**
 * Creates div containers in calendar for each day in the current month
 * @param {Object} currentMonthsData
 */
function createCalendarDays(currentMonthsData) {
    if (currentMonthsData) {
        const calendar = document.getElementById("calendar")
        const data = currentMonthsData;
        const days = data.dagar;

        for (day in days) {
            const div = document.createElement("div")
            const date = document.createElement("p")

            const dateForDay = formatDates(day, days);
            date.innerHTML = dateForDay;
            date.classList.add("date-number")
            
            div.classList.add("calendar-div");
            div.setAttribute("id", days[day].datum)

            calendar.append(div)
            div.append(date)

            addClassForWeekendDates(day, days, div);
            showHolidays(day, days, div);
        }
        presentCurrentMonthAndYear(currentMonthsData);
    }
}

/**
 * Creates filler div containers before the current months div containers representing the previous month
 * @param {Object} currentMonthsData 
 * @param {Object} previousMonthsData 
 */
function addFillerDivsBeforeCalendarDays(currentMonthsData, previousMonthsData) {
    if (currentMonthsData && previousMonthsData) {
        const calendar = document.getElementById("calendar")
        const previousMonthsDays = previousMonthsData.dagar;

        const currentMonthsDays = currentMonthsData.dagar;
        const firstDayInCurrentMonth = currentMonthsDays[0];

        divsToFill = {
            "Måndag": 0,
            "Tisdag": 1,
            "Onsdag": 2,
            "Torsdag": 3,
            "Fredag": 4,
            "Lördag": 5,
            "Söndag": 6
        }
    
        for (number in divsToFill) {
            if (firstDayInCurrentMonth.veckodag === number) {
                const emptySlots = divsToFill[number];
                const days = previousMonthsDays.splice((previousMonthsDays.length - emptySlots), emptySlots)

                for (day in days) {
                    const div = document.createElement("div");
                    const date = document.createElement("p");

                    const dateForDay = formatDates(day, days);
                    date.innerHTML = dateForDay;
                    date.classList.add("date-number")
                    date.style.color = "gray"
                    div.classList.add("calendar-div", "filler-div");
                    
                    div.append(date)
                    calendar.append(div)

                    addClassForWeekendDates(day, days, div);
                    showHolidays(day, days, div);
                }
            }
        }
    }
}


/**
 * Creates filler div containers after the current months div containers representing the next month
 * @param {Object} nextMonthsData 
 */
function addFillerDivsAfterCalendarDays(nextMonthsData) {
    if (nextMonthsData) {
        const calendar = document.getElementById("calendar")
        const totalGridCapacity = calculateCalendarGrid(calendar);
        const currentDivsCount = calendar.children;
        const emptySlots = totalGridCapacity - currentDivsCount.length;

        const days = nextMonthsData.dagar.slice(0, emptySlots)

        for (day in days) {
            const div = document.createElement("div");
            const date = document.createElement("p");
            const dateForDay = formatDates(day, days);
            
            date.innerHTML = dateForDay;
            date.classList.add("date-number")
            div.classList.add("calendar-div", "filler-div");
            div.append(date);
            calendar.append(div)

            addClassForWeekendDates(day, days, div);
            showHolidays(day, days, div);
        }
    }
}

/**
 * Calculates the total number of divs which fit within the calendar grid
 * @param {Element} calendar 
 */
function calculateCalendarGrid(calendar) {
    let gridColumnStyle = getComputedStyle(calendar).gridTemplateColumns;
    let gridRowStyle = getComputedStyle(calendar).gridTemplateRows;

    gridColumn = gridColumnStyle.split(" ");
    gridRow = gridRowStyle.split(" ");

    gridColumnIndex = 0;
    gridRowIndex = 0;

    for (arrayObject in gridColumn) {
        gridColumnIndex +=1;
    }
    for (arrayObject in gridRow) {
        gridRowIndex +=1;
    }

    const totalGridCapacity = gridColumnIndex * gridRowIndex;
    return totalGridCapacity;
}

/**
 * Returns the date representing the day in string form
 * @param {String} day 
 * @param {Object} days 
 */
function formatDates(day, days) {
    const dates = days[day].datum.split("-")
    let dateForDay = dates.splice(dates.length - 1)

    if (dateForDay < 10) {
        dateForDay = dateForDay[dateForDay.length - 1].substring(1)
    }
    return dateForDay;
}


/**
 * Adds specific classes to the divs which represent Saturday or Sunday
 * @param {String} day 
 * @param {Object} days 
 * @param {Element} div 
 */
function addClassForWeekendDates(day, days, div) {
    if (days[day].veckodag === "Lördag" || days[day].veckodag === "Söndag") {
        div.classList.add("weekend-div");
    }
}

/**
 * Formats the month to string form
 * @param {Number} month 
 */
function formatMonth(month) {
    switch(month) {
        case 01: return "January";
        case 02: return "February";
        case 03: return "March";
        case 04: return "April";
        case 05: return "May"
        case 06: return "June";
        case 07: return "July";
        case 08: return "August";
        case 09: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
    }
}

/**
 * Removes the divs within the calendar and changes the month
 * @param {Element} button 
 */
function changeMonth(button) {
    const calendar = document.getElementById("calendar");
    let calendarChildren = calendar.children

    while (calendarChildren.length > 0) {
        calendarChildren[calendarChildren.length - 1].remove()
    }

    if (button.id === "month-button-next") {
        month += 1
    }
    else if ( button.id === "month-button-previous" ) {
        month -= 1;
    }

    setYearInterval();
    getSvenskaDagarApi();
}


/** Resets the monthly count and changes the year */
function setYearInterval() {
   if (month === 0) {
       month = 12;
       year -= 1;
   }
   else if (month === 13) {
       month = 1;
       year += 1;
   }
}

/**
 * Changes the month which is presented in the month container
 * @param {Object} currentMonthsData 
 */
function presentCurrentMonthAndYear(currentMonthsData) {
    const monthContainer = document.getElementById("month-and-year")
    const datumArray = currentMonthsData.startdatum.split("-")
    const month = Number(datumArray[1]);

    const formattedMonth = formatMonth(month);

    monthContainer.innerHTML = formattedMonth + " " + year;
}

/**
 * Displays the holidays
 * @param {String} day 
 * @param {Object} days 
 * @param {Element} div 
 */
function showHolidays(day, days, div) {
    if (days[day].helgdag) {
        const holiday = document.createElement("p")
        holiday.innerHTML = days[day].helgdag
        holiday.classList.add("holiday")

        div.append(holiday)
    }
}
