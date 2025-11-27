import { Data } from "../data/data.js";
import {Dom, weeklyTableBody} from "../events/dom.js";

export function renderTasks() {
    Dom.dailyTableBody.innerHTML = ""; // clear before rendering
    Data.daily_tasks.forEach((value, id) => {
        addTaskHTML(id, value.task, value.pts);
    });
    renderWeeklyTasks();
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

export function renderWeeklyTasks() {
    if (!weeklyTableBody) return;

    weeklyTableBody.innerHTML = "";

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
    weeklyTableBody.insertAdjacentHTML("beforeend", html);
}

export const Renderer= {
    renderTasks,
    addTaskHTML,
    renderWeeklyTasks

};

