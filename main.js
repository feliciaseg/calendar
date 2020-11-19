window.onload = main;

async function main() {
    getSvenskaDagarApi();
    getCurrentMonth();
    createCalendarDays();
}

async function getSvenskaDagarApi() {
    const previousMonth = getPreviousMonth();
    const currentMonth = getCurrentMonth();
    const nextMonth = getNextMonth();

    const previousMonthsData = await getApiForPreviousMonth(previousMonth);
    const currentMonthsData = await getApiForCurrentMonth(currentMonth);
    const nextMonthsData = await getApiForNextMonth(nextMonth);

    addFillerDivsBeforeCalendarDays(currentMonthsData, previousMonthsData);
    createCalendarDays(currentMonthsData);
    addFillerDivsAfterCalendarDays(nextMonthsData);
}

async function getApiForPreviousMonth(previousMonth) {
    try {
        const month = previousMonth;
        const result = await fetch("https://sholiday.faboul.se/dagar/v2.1/2020/" + month)
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.error(error)
    }
}

async function getApiForCurrentMonth(currentMonth) {
    try {
        const month = currentMonth;
        const result = await fetch("https://sholiday.faboul.se/dagar/v2.1/2020/" + month)
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.error(error)
    }
}

async function getApiForNextMonth(nextMonth) {
    try {
        const month = nextMonth;
        const result = await fetch("https://sholiday.faboul.se/dagar/v2.1/2020/" + month)
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.error(error)
    }
}

function getPreviousMonth() {
    const date = new Date();
    const previousMonth = date.getMonth() - 1 ;
    return previousMonth;
}

function getCurrentMonth() {
    const date = new Date();
    const currentMonth = date.getMonth() + 0;
    return currentMonth;
}

function getNextMonth() {
    const date = new Date();
    const nextMonth = date.getMonth() + 1;
    return nextMonth;
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
            styleForWeekendDates(day, days, div)

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
                    styleForWeekendDates(day, days, div)
                    
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
            div.style.color = "grey";
            div.append(date);
            calendar.append(div)

            styleForWeekendDates(day, days, div)
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

function styleForWeekendDates(day, days, div) {
    if (days[day].veckodag === "Lördag" || days[day].veckodag === "Söndag") {
        div.style.backgroundColor = "lightgray";
    }
}