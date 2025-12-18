import { Data } from "../data/data.js";
import {Dom} from "../events/dom.js";

export function renderTasks() {
    $("#dailyTaskTable").html(""); // clear before rendering
    renderDailyTasks();
    renderWeeklyTasks();
    loadTaskStatus();
}

function addTaskHTML(id, description, points) {
    let dayCells = "";
    Data.days.forEach((_, i) => {
        dayCells += `
            <td class="day">
                <input type="checkbox"
                       data-task="${id}"
                       data-day="${i}">
            </td>
        `;
    });

    Dom.dailyTableBody.insertAdjacentHTML("beforeend", `
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
function renderDailyTasks(){
    Data.daily_tasks.forEach((value, id) => {
        addTaskHTML(id, value.task, value.pts);
    });
}
function loadTaskStatus() {
    Data.dailyTasksStatus.forEach((value, id) => {
        value.days.forEach((isChecked, dayIndex) => {
            const checkbox = $(`input[data-task='${id}'][data-day='${dayIndex}']`);
            checkbox.prop("checked", isChecked);
        });
    });
}

export function renderWeeklyTasks() {
    $("#weeklyTaskTable").html("");

    Data.weekly_tasks.forEach((value, id) => {
        addWeeklyTaskRow(id, value.task, value.pts);
    });
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

export const Renderer= {
    renderTasks,
    addTaskHTML,
    renderWeeklyTasks

};

