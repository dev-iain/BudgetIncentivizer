import {daily_tasks, days} from "../data/dailytasks.js";
import {weekly_tasks} from "../data/weeklytasks.js";
import {handleCheckboxChange} from "./ui.js";
import {addCheckboxListeners} from "../events/events.js";
export function renderTasks() {
    renderDailyTasks();
    renderWeeklyTasks();
    loadDailyTaskStatus();
    loadWeeklyTaskStatus();
}

function renderTaskTable(tableSelector, tasks, rowRenderer) {
    $(tableSelector).empty();
    tasks.forEach((value, id) => {
        rowRenderer(id, value.task, value.pts);
    });
}

function addTaskHTML(id, description, points) {
    let dayCells = "";
    days.forEach((_, i) => {
        dayCells += `
            <td class="day">
                <input type="checkbox"
                       data-task="${id}"
                       data-day="${i}">
            </td>
        `;
    });

    $("#dailyTaskTable").append(`
        <tr data-id="${id}">
            <td class="task">
                ${description}
                <i class="fa-solid fa-trash-can delete-icon"></i>
            </td>
            <td class="points">${points}</td>
            ${dayCells}
        </tr>
    `);
}
function renderDailyTasks() {
    renderTaskTable(
        "#dailyTaskTable",
        daily_tasks,
        addTaskHTML
    );
}


function loadDailyTaskStatus() {
    daily_tasks.forEach((value, id) => {
        value.completed.forEach((isChecked, dayIndex) => {
            const checkbox = $(`input[data-task='${id}'][data-day='${dayIndex}']`);
            checkbox.prop("checked", isChecked);
        });
    });
}

function loadWeeklyTaskStatus() {
    weekly_tasks.forEach((value, id) => {
        const checkbox = $(`input[data-task='${id}']`);
        checkbox.prop("checked", value.status);
    });
}

export function renderWeeklyTasks() {
    renderTaskTable(
        "#weeklyTaskTable",
        weekly_tasks,
        addWeeklyTaskRow
    );
}

function addWeeklyTaskRow(id, description, points) {
    const html = `
        <tr data-id="${id}">
            <td class="task">
                ${description}
                <i class="fa-solid fa-trash-can delete-icon"></i>
            </td>
            <td class="points">${points}</td>
            <td class="day center">
                <input type="checkbox" data-task="${id}">
            </td>
        </tr>
    `;
    $("#weeklyTaskTable").append(html);
}
export function refreshTable(){
    renderTasks();
    handleCheckboxChange();
    addCheckboxListeners();
}

export const Renderer= {
    renderTasks,
    addTaskHTML,
    renderWeeklyTasks
};

