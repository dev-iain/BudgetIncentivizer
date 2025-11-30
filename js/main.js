import { Data } from "./data/data.js";
import { Renderer } from "./ui/render.js";
import { addCheckboxListeners } from "./events/events.js";
import { UI } from "./ui/ui.js";
import "./events/dailytable.js";
import "./events/weekly.js";

function startup() {
    Data.loadData();
    Renderer.renderTasks();
    addCheckboxListeners();
    UI.handleCheckboxChange();
}

startup();
