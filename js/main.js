import {Data, refreshWeek} from "./data/data.js";
import { Renderer } from "./ui/render.js";
import { addCheckboxListeners } from "./events/events.js";
import { UI } from "./ui/ui.js";
import "./events/tasktable.js";
import "./calculations/stats.js";
import "./events/stats.js"
import "./data/history.js"
import "./data/jsonloading.js"
import {buildWeekSnapshotFromTasks} from "./data/history.js";
import {downloadData} from "./data/jsonsaving.js";
import {getWeek} from "./data/date.js";

function startup() {
    const today = new Date();
    Data.loadData();
    refreshWeek();
    Renderer.renderTasks();
    addCheckboxListeners();
    UI.handleCheckboxChange();
    buildWeekSnapshotFromTasks(getWeek(today))
}

startup();
