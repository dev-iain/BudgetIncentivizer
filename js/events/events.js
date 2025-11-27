import {Dom as Daily, Dom, typeTaskDropdown} from "./dom.js";
import {handleCheckboxChange, UI} from "../ui/ui.js";
import {Renderer, renderTasks, renderWeeklyTasks} from "../ui/render.js";
import {daily_tasks, Data, saveData, weekly_tasks} from "../data/data.js";
import { Statistics } from "../calculations/stats.js";

export function addCheckboxListeners() {
    if(Dom.dailyTableBody) {
        Dom.dailyTableBody.addEventListener("change", (e) => {
            if (e.target.matches("input[type='checkbox']")) {
                UI.handleCheckboxChange();
            }
        });
    }
    if(Daily.weeklyTableBody) {
        Dom.weeklyTableBody.addEventListener("change", (e) => {
            if (e.target.matches("input[type='checkbox']")) {
                UI.handleCheckboxChange();
            }
        })
    }
}

// le buttons
Dom.addTaskBtn.addEventListener("click", () => {
    let type = getDropdownType();
    addTask(type);
});

Dom.dailyTableBody.addEventListener("click", (event) => {
    if(event.target.classList.contains("delete-icon")) {
        const row = event.target.closest("tr");
        const id = row.dataset.id;
        const taskType = getTaskType(id);
        deleteTask(id, taskType);
        saveData();
        renderTasks();
        UI.handleCheckboxChange();
    }


});

Dom.calculateStatsBtn.addEventListener("click", (event) => {
    const { bestDay, bestDayPts } = Statistics.calcBestDay();
    document.getElementById("bestDay").textContent = bestDay;
    document.getElementById("bestPoints").textContent = bestDayPts;

});

document.getElementById("addWeeklyTask")?.addEventListener("click", () => {
    let taskName = document.getElementById("weeklyTaskName").value;
    let taskPoints = Number(document.getElementById("weeklyTaskPoints").value);
    const id = crypto.randomUUID();

    weekly_tasks.set(id, { task: taskName, pts: taskPoints });
    renderWeeklyTasks(weekly_tasks);
    UI.handleCheckboxChange();

    document.getElementById("weeklyTaskName").value = "";
    document.getElementById("weeklyTaskPoints").value = "";
});

function addTask(type){
    let taskName = document.getElementById("taskName").value;
    let taskPoints = Number(document.getElementById("taskPoints").value);
    const id = crypto.randomUUID();

    if (type === "daily") {
        Data.daily_tasks.set(id, {task: taskName, pts: taskPoints, type: type});
        Renderer.addTaskHTML(id, taskName, taskPoints);
    } else if (type === "weekly") {
        Data.weekly_tasks.set(id, {task: taskName, pts: taskPoints, type: type});
        Renderer.renderWeeklyTasks(weekly_tasks);
    }
    Data.saveData();
}
function deleteTask(id, type){
    type === "daily" ? daily_tasks.delete(id) : weekly_tasks.delete(id);
}

function getDropdownType() {
    let type = typeTaskDropdown.value;
    if (type === "Daily") {
        return "daily"
    } else {
        return "weekly"
    }
}
function getTaskType(id) {
    const daily  = daily_tasks.get(id);
    const weekly = weekly_tasks.get(id);

    if (daily?.type === "daily")  return "daily";
    if (weekly?.type === "weekly") return "weekly";

    return "No task exists."; // fallback message stays the same
}
