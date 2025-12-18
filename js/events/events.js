import { Dom, typeTaskDropdown } from "./dom.js";
import { handleCheckboxChange } from "../ui/ui.js";
import { Renderer, renderTasks, renderWeeklyTasks } from "../ui/render.js";
import { daily_tasks, saveData, weekly_tasks } from "../data/data.js";

export function addCheckboxListeners() {

    addCheckboxListenersHelper(Dom.dailyTableBody);
    addCheckboxListenersHelper(Dom.weeklyTableBody);
}
export function addCheckboxListenersHelper(elem) {
    for (const checkbox of elem.querySelectorAll("input[type='checkbox']")) {
        checkbox.addEventListener("change", handleCheckboxChange);
    }
}

// le buttons
if (Dom.addTaskBtn) {
    Dom.addTaskBtn.addEventListener("click", () => {
        let type = getDropdownType();
        addTask(type);
    });
}

export function deleteTaskHelper(event){
    if (event.target.classList.contains("delete-icon")) {
        const row = event.target.closest("tr");
        const id = row.dataset.id;
        const taskType = getTaskType(id);
        deleteTask(id, taskType);
        saveData();
        renderTasks();
        handleCheckboxChange();
    }
}


export function addTask(type) {
    const taskNameInput = $("#taskName");
    const taskPointsInput = $("#taskPoints");

    const taskName = taskNameInput.val();
    const taskPoints = Number(taskPointsInput.val());
    const id = crypto.randomUUID();

    if (type === "daily") {
        daily_tasks.set(id, {task: taskName, pts: taskPoints, type});
        Renderer.addTaskHTML(id, taskName, taskPoints);

    } else if (type === "weekly") {
        weekly_tasks.set(id, {task: taskName, pts: taskPoints, type});
        Renderer.renderWeeklyTasks(weekly_tasks);
    }
    addCheckboxListeners();
    saveData();
    handleCheckboxChange();
    taskNameInput.val("");
    taskPointsInput.val("");
}

export function deleteTask(id, type) {
    type === "daily" ? daily_tasks.delete(id) : weekly_tasks.delete(id);
}

export function getDropdownType() {
    return typeTaskDropdown?.value === "Daily" ? "daily" : "weekly";
}

export function getTaskType(id) {
    const daily = daily_tasks.get(id);
    const weekly = weekly_tasks.get(id);

    if (daily?.type === "daily") return "daily";
    if (weekly?.type === "weekly") return "weekly";

    return "No task exists.";
}
