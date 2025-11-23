
// data
let objectives = new Map();
objectives.set(1, { task:"Log expenses daily", pts: 5 });
objectives.set(2, { task:"Stay under weekly budget", pts: 50 });
objectives.set(3, { task:"Have a no-spend day", pts: 20 });

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


// dom references
const tableBody = document.getElementById("taskTable");
const addTaskBtn = document.getElementById("addTask");
const deleteDataBtn = document.getElementById("deleteData");
//startup
function startup(){
    loadData();
    renderTasks();
    addCheckboxListeners();
    handleCheckboxChange();
}

startup();

function renderTasks() {
    objectives.forEach((value, key) => {
        addTaskHTML(key, value.task, value.pts);
    });
    addCheckboxListeners(1)
}
// calculations
function sumDay(dayIndex) {
    let sum = 0;

    objectives.forEach((value, key) => {
        const box = document.getElementById(`checkbox-${key}-${dayIndex}`);
        if (box && box.checked) {
            sum += value.pts;
        }
    });

    return sum;
}

function totalPossiblePoints() {
    let total = 0;
    objectives.forEach(v => total += v.pts);
    return total * days.length;
}

function weeklyCompletionPercentage() {
    let totalPossible = totalPossiblePoints();
    let completed = 0;

    days.forEach((_, i) => completed += sumDay(i));

    return completed / totalPossible;
}

function currentPoints(){
    let currTotal = 0;
    for(let i = 0; i < days.length; i++){
        currTotal += sumDay(i)
    }
    return currTotal;
}


function saveData(){
    window.localStorage.setItem("tasks", JSON.stringify([...objectives]));
}

function loadData(){
    const stored = localStorage.getItem("tasks");
    if (stored)  objectives = new Map(JSON.parse(stored));
}
function deleteData(){
    window.localStorage.clear();
}
// -------------------------
// EVENT HANDLERS
// -------------------------
function handleCheckboxChange() {
    if (objectives.size === 0) {
        days.forEach((_, i) => {
            document.getElementById(`dayTotal-${i}`).textContent = 0;
        });
        document.getElementById("completion").value = 0;
        document.getElementById("completedPointsSum").textContent = "0%";
        document.getElementById("totalPointsSum").value = 0;
        return;
    }

    days.forEach((_, i) => {
        document.getElementById(`dayTotal-${i}`).textContent = sumDay(i);
    });

    const weeklyPercent = weeklyCompletionPercentage(); // 0 → 1
    document.getElementById("completion").value = weeklyPercent;
    document.getElementById("completedPointsSum").textContent =
        (weeklyPercent * 100).toFixed(0) + "%";
    document.getElementById("totalPointsSum").textContent = totalPossiblePoints();
    document.getElementById("currTotals").textContent = currentPoints();
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
            <td class="task">${key}</td>
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

//event listeners

addTaskBtn.addEventListener("click", () => {
    let taskName = document.getElementById("taskName").value;
    let taskPoints = Number(document.getElementById("taskPoints").value);
    let newTask = objectives.size + 1;
    objectives.set(newTask, { task: taskName, pts: taskPoints });
    addTaskHTML(newTask, taskName, taskPoints);
    saveData();
    addCheckboxListeners(newTask)
    handleCheckboxChange();
    document.getElementById("taskName").value = "";
    document.getElementById("taskPoints").value = "";
});

deleteDataBtn.addEventListener("click", () => {
    deleteData();
})