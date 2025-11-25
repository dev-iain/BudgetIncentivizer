import { objectives, saveData } from "./data.js";
import { tableBody, addTaskBtn } from "./dom.js";
import { addTaskHTML, renderTasks } from "./render.js";
import { handleCheckboxChange } from "./ui.js";

export function addCheckboxListeners() {
    tableBody.addEventListener("change", (e) => {
        if (e.target.matches("input[type='checkbox']")) {
            handleCheckboxChange();
        }
    });
}

// le buttons
addTaskBtn.addEventListener("click", () => {
    let taskName = document.getElementById("taskName").value;
    let taskPoints = Number(document.getElementById("taskPoints").value);
    const id = crypto.randomUUID();
    objectives.set(id, { task: taskName, pts: taskPoints });
    addTaskHTML(id, taskName, taskPoints);
    saveData();
    handleCheckboxChange();
    document.getElementById("taskName").value = "";
    document.getElementById("taskPoints").value = "";
});

tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-icon")) {
        const row = event.target.closest("tr");
        const id = row.dataset.id;
        objectives.delete(id);
        saveData();
        renderTasks();
        handleCheckboxChange();
    }
});
