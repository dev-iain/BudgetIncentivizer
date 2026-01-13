import { handleCheckboxChange } from "../ui/ui.js";
import {addTask, getDropdownType} from "./tasktable.js";
import {downloadData} from "../data/jsonsaving.js";
import {daily_tasks} from "../data/dailytasks.js";

export function addCheckboxListeners() {

    addCheckboxListenersHelper($("#dailyTaskTable"));
    addCheckboxListenersHelper($("#weeklyTaskTable"));
}
export function addCheckboxListenersHelper(elem) {
    $(elem)
        .find("input[type='checkbox']")
        .on("change", handleCheckboxChange);
}

$("#taskForm").on("submit", function (event) {
    event.preventDefault();
    let type = getDropdownType();
    addTask(type);
});

$("#saveFile").on("click", function (event) {
    downloadData(daily_tasks, "userdata")
});

