import { Dom, typeTaskDropdown } from "./dom.js";
import { handleCheckboxChange } from "../ui/ui.js"; // ✅ use only this directly
import { Renderer, renderTasks, renderWeeklyTasks } from "../ui/render.js";
import { daily_tasks, saveData, weekly_tasks } from "../data/data.js"; // ✅ ensure we read/write same stores
import { Statistics } from "../calculations/stats.js";

export function addCheckboxListeners() {
    // ✅ Guard daily table
    if (Dom.dailyTableBody) {
        Dom.dailyTableBody.addEventListener("change", (e) => {
            if (e.target.matches("input[type='checkbox']")) {
                handleCheckboxChange(e); // ✅ pass real event context
            }
        });
    }

    // ✅ Guard weekly table
    if (Dom.weeklyTableBody) {
        Dom.weeklyTableBody.addEventListener("change", (e) => {
            if (e.target.matches("input[type='checkbox']")) {
                handleCheckboxChange(e);
            }
        });
    }
}

// le buttons
if (Dom.addTaskBtn) {
    Dom.addTaskBtn.addEventListener("click", () => {
        let type = getDropdownType();
        addTask(type);
    });
}

if (Dom.dailyTableBody) {
    Dom.dailyTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-icon")) {
            const row = event.target.closest("tr");
            const id = row.dataset.id;
            const taskType = getTaskType(id);
            deleteTask(id, taskType);

            saveData();
            renderTasks();
            handleCheckboxChange(); // ✅ run after DOM is stable
        }
    });
}

if (Dom.calculateStatsBtn) {
    Dom.calculateStatsBtn.addEventListener("click", () => {
        const { bestDay, bestDayPts } = Statistics.calcBestDay();
        document.getElementById("bestDay").textContent = bestDay;
        document.getElementById("bestPoints").textContent = bestDayPts;
    });
}

document.getElementById("addWeeklyTask")?.addEventListener("click", () => {
    let taskName = document.getElementById("weeklyTaskName").value;
    let taskPoints = Number(document.getElementById("weeklyTaskPoints").value);
    const id = crypto.randomUUID();

    weekly_tasks.set(id, { task: taskName, pts: taskPoints });
    renderWeeklyTasks(weekly_tasks);
    handleCheckboxChange();

    document.getElementById("weeklyTaskName").value = "";
    document.getElementById("weeklyTaskPoints").value = "";
});

function addTask(type) {
    let taskName = document.getElementById("taskName").value;
    let taskPoints = Number(document.getElementById("taskPoints").value);
    const id = crypto.randomUUID();

    if (type === "daily") {
        daily_tasks.set(id, { task: taskName, pts: taskPoints, type });
        Renderer.addTaskHTML(id, taskName, taskPoints);
    } else if (type === "weekly") {
        weekly_tasks.set(id, { task: taskName, pts: taskPoints, type });
        Renderer.renderWeeklyTasks(weekly_tasks);
    }

    saveData();
}

function deleteTask(id, type) {
    type === "daily" ? daily_tasks.delete(id) : weekly_tasks.delete(id);
}

function getDropdownType() {
    return typeTaskDropdown?.value === "Daily" ? "daily" : "weekly";
}

function getTaskType(id) {
    const daily = daily_tasks.get(id);
    const weekly = weekly_tasks.get(id);

    if (daily?.type === "daily") return "daily";
    if (weekly?.type === "weekly") return "weekly";

    return "No task exists.";
}
