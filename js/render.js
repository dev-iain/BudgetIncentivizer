import { objectives, days } from "./data.js";
import { tableBody } from "./dom.js";

export function renderTasks() {
    tableBody.innerHTML = ""; // clear before rendering
    objectives.forEach((value, id) => {
        addTaskHTML(id, value.task, value.pts);
    });
}

export function addTaskHTML(id, description, points) {

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

    tableBody.insertAdjacentHTML("beforeend", `
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

