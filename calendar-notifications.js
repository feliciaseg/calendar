function notificationMain() {
    setTimeout( function() {
        createNotification();
    }, 200)
}

function createNotification() {
    const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    const calendarDivs = document.getElementsByClassName("calendar-div")
    let counter = 0;

    for (i = 0; i < calendarDivs.length; i++) {
        for (task in savedTasks) {
            if (savedTasks[task].date === calendarDivs[i].id) {
                for (child in calendarDivs[i].children) {
                    if (calendarDivs[i].lastElementChild.classList.contains("notification")) {
                        calendarDivs[i].lastElementChild.remove()
                    }
                }
                counter += 1

                console.log(savedTasks[task].date + " " + calendarDivs[i].id)
                const div = document.createElement("div")
                const p = document.createElement("p")
                p.innerHTML = counter
                div.append(p);
                calendarDivs[i].append(div)
                div.setAttribute("class", "primary-background notification")
            }
        }
    }
}