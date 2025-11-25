import { loadData } from "./data.js";
import { renderTasks } from "./render.js";
import { addCheckboxListeners } from "./events.js";
import { handleCheckboxChange } from "./ui.js";

function startup() {
    localStorage.clear();
    loadData();
    renderTasks();
    addCheckboxListeners();
    handleCheckboxChange();
}

startup();
