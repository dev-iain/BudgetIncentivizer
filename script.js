
// data
const objectives = new Map();
/*objectives.set(1, { task:"Log expenses daily", pts: 5 });
objectives.set(2, { task:"Stay under weekly budget", pts: 50 });
objectives.set(3, { task:"Have a no-spend day", pts: 20 });*/


const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


// dom references
const tableBody = document.getElementById("taskTable");
const addTaskBtn = document.getElementById("addTask");


objectives.forEach((value, key) => {
    addTaskHTML(key, value.task, value.pts);
});
addCheckboxListeners(1)

// calculations
function sumDay(dayIndex) {
    let sum = 0;
    let fullSum = 0;

    objectives.forEach((value, key) => {
        fullSum += value.pts;
        const box = document.getElementById(`checkbox-${key}-${dayIndex}`);
        if (box && box.checked) {
            sum += value.pts;
        }
    });

    const proportion = sum / fullSum;
    return [sum, fullSum, proportion];
}


// -------------------------
// EVENT HANDLERS
// -------------------------
function handleCheckboxChange() {
    // update each day's total
    days.forEach((_, i) => {
        document.getElementById(`dayTotal-${i}`).textContent = sumDay(i)[0];
    });

    // completion %
    let totalProp = 0;
    days.forEach((_, i) => totalProp += sumDay(i)[2]);
    totalProp /= days.length;

    document.getElementById("completion").value = totalProp;
    document.getElementById("completedPointsSum").textContent =
        (totalProp * 100).toFixed(0) + "%";
}



// -------------------------
// HTML GENERATION
// -------------------------
function addTaskHTML(key, description, points) {

    // generate the day cells ONLY for this task
    let dayCells = "";
    days.forEach((_, i) => {
        dayCells += `
            <td class="day">
                <input type="checkbox" 
                       class="checkbox-${key}" 
                       data-day="${i}" 
                       id="checkbox-${key}-${i}">
            </td>
        `;
    });

    // append one row
    tableBody.insertAdjacentHTML("beforeend", `
        <tr>
            <td class="task">${key}<i class="fa-solid fa-trash-can delete-icon"></i></td>
            <td class="description">${description}</td>
            <td class="points">${points}</td>
            ${dayCells}
        </tr>
    `);
}


function addCheckboxListeners(startIndex) {
    for (let taskIndex = startIndex; taskIndex <= objectives.size; taskIndex++) {
        days.forEach((_, dayIndex) => {
            const checkbox = document.getElementById(`checkbox-${taskIndex}-${dayIndex}`);
            if (checkbox) {
                checkbox.addEventListener("change", handleCheckboxChange);
            }
        });
    }
}


// le buttons
addTaskBtn.addEventListener("click", () => {
    let taskName = document.getElementById("taskName").value;
    let taskPoints = Number(document.getElementById("taskPoints").value);
    let newTask = objectives.size + 1;
    objectives.set(newTask, { task: taskName, pts: taskPoints });

    addTaskHTML(newTask, taskName, taskPoints);
    addCheckboxListeners(newTask)
    handleCheckboxChange();
});

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-icon")) {
        const row = event.target.closest("tr");
        row.remove();
        objectives.delete(row);
        //console.log(objectives);
    }
});