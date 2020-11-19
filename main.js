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

    getApiForPreviousMonth(previousMonth);
    const currentMonthsData = await getApiForCurrentMonth(currentMonth);
    console.log("currentMonthsData"  + currentMonthsData)
    getApiForNextMonth(nextMonth);
    createCalendarDays(currentMonthsData)
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
    const data = currentMonthsData;

    if (data) {
        const dagar = data.dagar;
        const firstDayInMonth = dagar[0]
        addFillerDivsBeforeCalendarDays(firstDayInMonth);

        for (dag in dagar) {
            const div = document.createElement("div")
            const date = document.createElement("p")
            date.innerHTML = Number(dag) + 1;
            calendar.append(div)
            div.append(date)
    
            if (dagar[dag].veckodag === "Söndag") {
                div.style.backgroundColor = "gray"
            }
        }
        addFillerDivsAfterCalendarDays();
    }
}

function addFillerDivsBeforeCalendarDays(firstDayInMonth) {
    const calendar = document.getElementById("calendar")

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
        if (firstDayInMonth.veckodag === number) {
            for (i = 0; i < fillerDivs[number]; i++) {
                const fillerDiv = document.createElement("div");
                fillerDiv.style.backgroundColor = "lightGrey";
                calendar.append(fillerDiv)
            }
        }
    }
}

function addFillerDivsAfterCalendarDays() {
    const calendar = document.getElementById("calendar")
    const totalGridCapacity = calculateCalendarGrid(calendar);
    const currentDivsCount = calendar.children;
    const emptySlots = totalGridCapacity - currentDivsCount.length;

    for (i = 0; i < emptySlots; i++) {
        const fillerDiv = document.createElement("div");
        fillerDiv.style.backgroundColor = "lightGrey";
        calendar.append(fillerDiv)
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