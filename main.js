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
    const previousMonth = date.getMonth();
    return previousMonth;
}

function getCurrentMonth() {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    return currentMonth;
}

function getNextMonth() {
    const date = new Date();
    const nextMonth = date.getMonth() + 2;
    return nextMonth;
}

function createCalendarDays(currentMonthsData) {
    const calendar = document.getElementById("calendar")

    if (currentMonthsData) {
        const data = currentMonthsData;
        const days = data.dagar;
        const firstDayInCurrentMonth = days[0]
        addFillerDivsBeforeCalendarDays(firstDayInCurrentMonth);

        for (day in days) {
            const div = document.createElement("div")
            const date = document.createElement("p")
            date.innerHTML = Number(day) + 1;
            calendar.append(div)
            div.append(date)
    
            if (days[day].veckodag === "Söndag") {
                div.style.backgroundColor = "gray"
            }
        }
    }
}

function addFillerDivsBeforeCalendarDays(currentMonthsData, previousMonthsData) {
    const calendar = document.getElementById("calendar")

    if (currentMonthsData && previousMonthsData) {
        const currentDays = currentMonthsData.dagar;
        const previousMonthsDays = previousMonthsData.dagar;
        const firstDayInCurrentMonth = currentDays[0];

        fillerDivs = {
            "Måndag": 0,
            "Tisdag": 1,
            "Onsdag": 2,
            "Torsdag": 3,
            "Fredag": 4,
            "Lördag": 5,
            "Söndag": 6
        }
    
        for (number in fillerDivs) {
            if (firstDayInCurrentMonth.veckodag === number) {
                const emptySlots = fillerDivs[number];
                const fillerDays = previousMonthsDays.splice((previousMonthsDays.length - emptySlots), emptySlots)

                for (day in fillerDays) {
                    const fillerDiv = document.createElement("div");
                    const fillerDateP = document.createElement("p");


                    const fillerDates = fillerDays[day].datum.split("-")
                    const dateForDay = fillerDates[fillerDates.length - 1];
                    fillerDateP.innerHTML = dateForDay;
                    //fillerDate.innerHTML = fillerDays[day].datum;
                    fillerDiv.style.backgroundColor = "lightGrey";
                    
                    fillerDiv.append(fillerDateP)
                    calendar.append(fillerDiv)
                }
            }
        }
    }

}

function addFillerDivsAfterCalendarDays(nextMonthsData) {
    const calendar = document.getElementById("calendar")
    const totalGridCapacity = calculateCalendarGrid(calendar);
    const currentDivsCount = calendar.children;
    const emptySlots = totalGridCapacity - currentDivsCount.length;

    const fillerDays = nextMonthsData.dagar.slice(0, emptySlots)

    for (day in fillerDays) {
        const fillerDiv = document.createElement("div");
        fillerDiv.style.backgroundColor = "lightGrey";

        const fillerDateP = document.createElement("p")
        fillerDateP.innerHTML = Number(day) + 1;
        fillerDiv.append(fillerDateP);
        calendar.append(fillerDiv)

        if (fillerDays[day].veckodag === "Söndag") {
            fillerDiv.style.backgroundColor = "gray";
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