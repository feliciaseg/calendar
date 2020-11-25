/** Functions to run on window load */
function notificationMain() {
    createNotification();
}

/** Created notification in calendar */
function createNotification() {
    
    // Gives calender time to finish loading before initiation
    setTimeout( function() {
        const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
        const calendarDivs = document.getElementsByClassName("calendar-div")
    
        for (i = 0; i < calendarDivs.length; i++) {
            // Counts the amount of todos which occur on the same day
            let counter = 0;

            for (task in savedTasks) {
                if (savedTasks[task].date === calendarDivs[i].id) {
                    // Removes previous notification before creating a new one
                    for (child in calendarDivs[i].children) {
                        if (calendarDivs[i].lastElementChild.classList.contains("notification")) {
                            calendarDivs[i].lastElementChild.remove()
                        }
                    }
                    const div = document.createElement("div")
                    const p = document.createElement("p")
    
                    counter += 1
                    p.innerHTML = counter
    
                    div.append(p);
                    calendarDivs[i].append(div)
                    div.setAttribute("class", "primary-background notification")
                }
            }
        }
    }, 200)
}