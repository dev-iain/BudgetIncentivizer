import { Data } from "../data/data.js";

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
    Data.days.forEach((_, i) => {
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
        Data.daily_tasks,
        addTaskHTML
    );
}


function loadDailyTaskStatus() {
    Data.dailyTasksStatus.forEach((value, id) => {
        value.days.forEach((isChecked, dayIndex) => {
            const checkbox = $(`input[data-task='${id}'][data-day='${dayIndex}']`);
            checkbox.prop("checked", isChecked);
        });
    });
}
function loadWeeklyTaskStatus() {
    Data.weeklyTasksStatus.forEach((value, id) => {
        const checkbox = $(`input[data-task='${id}']`);
        checkbox.prop("checked", value.status);
    });
}

export function renderWeeklyTasks() {
    renderTaskTable(
        "#weeklyTaskTable",
        Data.weekly_tasks,
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

export const Renderer= {
    renderTasks,
    addTaskHTML,
    renderWeeklyTasks
};

