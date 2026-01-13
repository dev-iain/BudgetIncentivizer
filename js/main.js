import {Data, refreshWeek} from "./data/data.js";
import { Renderer } from "./ui/render.js";
import { addCheckboxListeners } from "./events/events.js";
import { UI } from "./ui/ui.js";
import "./events/tasktable.js";
import "./calculations/stats.js";
import "./events/stats.js"
import "./data/history.js"
import "./data/jsonloading.js"
import {buildTaskHistory} from "./data/history.js";
import {downloadData} from "./data/jsonsaving.js";

function startup() {
    Data.loadData();
    refreshWeek();
    Renderer.renderTasks();
    addCheckboxListeners();
    UI.handleCheckboxChange();
    buildTaskHistory();
}

startup();
