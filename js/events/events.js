import { handleCheckboxChange } from "../ui/ui.js";
import {addTask, getDropdownType} from "./tasktable.js";

export function addCheckboxListeners() {

    addCheckboxListenersHelper($("#dailyTaskTable"));
    addCheckboxListenersHelper($("#weeklyTaskTable"));
}
export function addCheckboxListenersHelper(elem) {
    $(elem)
        .find("input[type='checkbox']")
        .on("change", handleCheckboxChange);
}

$("#addTask").on("click", function () {
    let type = getDropdownType();
    addTask(type);
});


