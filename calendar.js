const todaysDate = new Date();
let day = todaysDate.getDate();
let month = todaysDate.getMonth() + 1;
let year = todaysDate.getFullYear();

window.onload = main;

async function main() {
    getSvenskaDagarApi();
    createCalendarDays();
    addEventListeners();
}

function addEventListeners() {
    const previousMonth = document.getElementById("month-button-previous");
    const nextMonth = document.getElementById("month-button-next");

    previousMonth.addEventListener("click", () => changeMonth(previousMonth));
    nextMonth.addEventListener("click", () => changeMonth(nextMonth));
}

async function getSvenskaDagarApi() {
    const previousMonthsData = await getApiForPreviousMonth();
    const currentMonthsData = await getApiForCurrentMonth();
    const nextMonthsData = await getApiForNextMonth();

    addFillerDivsBeforeCalendarDays(currentMonthsData, previousMonthsData);
    createCalendarDays(currentMonthsData);
    addFillerDivsAfterCalendarDays(nextMonthsData);
}

async function getApiForPreviousMonth() {
    let previousMonth = month - 1;
    if (previousMonth === 0 ) {
        previousMonth = 12;
    }
    try {
        const result = await fetch("https://sholiday.faboul.se/dagar/v2.1/" + year + "/" + previousMonth)
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.error(error)
    }
}

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

async function getApiForNextMonth() {
    let nextMonth = month + 1;
    if (nextMonth === 13 ) {
        nextMonth = 1;
    }
    try {
        const result = await fetch("https://sholiday.faboul.se/dagar/v2.1/" + year + "/" + nextMonth)
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.error(error)
    }
}

function createCalendarDays(currentMonthsData) {
    if (currentMonthsData) {
        const calendar = document.getElementById("calendar")
        const data = currentMonthsData;
        const days = data.dagar;
        const firstDayInCurrentMonth = days[0]

        addFillerDivsBeforeCalendarDays(firstDayInCurrentMonth);

        for (day in days) {
            const div = document.createElement("div")
            const date = document.createElement("p")
            const dateForDay = formatDates(day, days);
            date.innerHTML = dateForDay;
            div.classList.add("calendar-div");
            div.setAttribute("id", days[day].datum)
            addClassForWeekendDates(day, days, div)

            calendar.append(div)
            div.append(date)
        }
    }
}

function addFillerDivsBeforeCalendarDays(currentMonthsData, previousMonthsData) {
    if (currentMonthsData && previousMonthsData) {
        const calendar = document.getElementById("calendar")
        const previousMonthsDays = previousMonthsData.dagar;

        const currentDays = currentMonthsData.dagar;
        const firstDayInCurrentMonth = currentDays[0];

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
                    date.style.color = "gray"
                    div.classList.add("calendar-div", "filler-div");
                    addClassForWeekendDates(day, days, div)
                    
                    div.append(date)
                    calendar.append(div)
                }
            }
        }
    }
}

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
            div.classList.add("calendar-div", "filler-div");
            div.append(date);
            calendar.append(div)

            addClassForWeekendDates(day, days, div)
        }
    }
}

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

function formatDates(day, days) {
    const dates = days[day].datum.split("-")
    let dateForDay = dates.splice(dates.length - 1)

    if (dateForDay < 10) {
        dateForDay = dateForDay[dateForDay.length - 1].substring(1)
    }

    return dateForDay;
}

function addClassForWeekendDates(day, days, div) {
    if (days[day].veckodag === "Lördag" || days[day].veckodag === "Söndag") {
        div.classList.add("weekend-div");
    }
}

function changeMonth(button) {
    console.log("hello")
    const todaysDate = new Date();
    const month = date.getMonth();

    console.log(button)
    // const currentYear = todaysDate.getFullYear();
    /*const currentMonthFormatted = formatMonth(currentMonth);

    const container = document.getElementById("month-and-year")
    container.innerHTML = currentMonthFormatted + " " + currentYear;*/
}

function formatMonth(month) {
    switch(month) {
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May"
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
    }
}

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

    setYearIntervall();
    getSvenskaDagarApi();
}

function setYearIntervall() {
   if (month === 0) {
       month = 12;
   }
   else if (month === 13) {
       month = 1;
   }
   console.log(month)
}