import {Data, refreshWeek} from "./data/data.js";
import { Renderer } from "./ui/render.js";
import { addCheckboxListeners } from "./events/events.js";
import { UI } from "./ui/ui.js";
import "./events/tasktable.js";
import "./calculations/stats.js";
import "./events/stats.js"
import "./data/history.js"
import {setTestData} from "../tests/tests.js";
import {buildTaskHistory} from "./data/history.js";
function startup() {
    refreshWeek();
    Data.loadData();
    Renderer.renderTasks();
    addCheckboxListeners();
    UI.handleCheckboxChange();
    console.log(buildTaskHistory());
}

startup();
