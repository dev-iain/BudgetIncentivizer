import {addCheckboxListeners} from "./events.js";
import {saveData} from "../data/data.js";
import {Renderer, renderTasks} from "../ui/render.js";
import {handleCheckboxChange} from "../ui/ui.js";
import {daily_tasks} from "../data/dailytasks.js";
import {weekly_tasks} from "../data/weeklytasks.js";

addCheckboxListeners();
$("#dailyTaskTable, #weeklyTaskTable").on("click", function (event) {
    deleteTaskHelper(event);
});

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
    return $("#taskType").val() === "Daily" ? "daily" : "weekly";
}

export function getTaskType(id) {
    const daily = daily_tasks.get(id);
    const weekly = weekly_tasks.get(id);

    if (daily?.type === "daily") return "daily";
    if (weekly?.type === "weekly") return "weekly";

    return "No task exists.";
}