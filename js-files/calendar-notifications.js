/** Creates notifications in calendar */
function createNotification() {
    const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    const calendarDivs = document.getElementsByClassName("calendar-div")
    const notifications = document.getElementsByClassName("notification")

    // Removes all existing notifications
    for (notification in notifications) {
        while (notifications.length > 0) {
            notifications[notification].remove();
        }
    }

    // Creates notifications
    for (i = 0; i < calendarDivs.length; i++) {
        // Counts the amount of todos which occur on the same day
        let counter = 0;

        for (task in savedTasks) {
            if (savedTasks[task].date === calendarDivs[i].id) {
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
}