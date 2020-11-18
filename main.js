window.onload = main;

function main() {
    getApi();
    getMonth();
    createCalendarDays();
}

async function getApi() {
    try {
        const month = getMonth();
        const result = await fetch("https://sholiday.faboul.se/dagar/v2.1/2020/" + month)
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.error(error)
    }
}

function getMonth() {
    const date = new Date();
    const month = date.getMonth() + 1;
    return month;
}

async function createCalendarDays() {
    const data = await getApi();
    const dagar = data.dagar
    console.log(data)

    const calendar = document.getElementById("calendar")
    
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
}