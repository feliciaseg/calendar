/** Created notification in calendar */
function createNotification() {
    
    // Gives calender time to finish loading before initiation
    const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    const calendarDivs = document.getElementsByClassName("calendar-div")

    for (i = 0; i < calendarDivs.length; i++) {
        // Counts the amount of todos which occur on the same day
        let counter = 0;
        if (calendarDivs[i].classList.contains("is-attached")) {
            for (j = 0; j < calendarDivs[i].children.length; j++) {
                if (calendarDivs[i].children[j].classList.contains("notification")) {
                    calendarDivs[i].children[j].remove();
                }
            }
        }
        calendarDivs[i].classList.remove("is-attached")

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
                calendarDivs[i].classList.add("is-attached")
            }
        }
    }
}