
import { Dom} from "./dom.js";
import {deleteTaskHelper, addCheckboxListeners} from "./events.js";

addCheckboxListeners();
if (Dom.dailyTableBody) {
    Dom.dailyTableBody.addEventListener("click", (event) => {
        deleteTaskHelper(event);
    });
    Dom.weeklyTableBody.addEventListener("click", (event) => {
        deleteTaskHelper(event);
    });
}