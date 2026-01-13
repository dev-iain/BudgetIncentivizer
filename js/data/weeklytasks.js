import {Data} from "./data.js";

export let weekly_tasks = new Map([]);
export const weeklyTasksStatus = new Map();

export function saveWeeklyTaskStatus() {
    Data.weekly_tasks.forEach((value, id) => {
        const checkbox = $(`input[data-task='${id}']`);
        let taskStatus = checkbox.is(":checked");
        weekly_tasks.set(id, {
            ...weekly_tasks.get(id),
            status:taskStatus});
    });
    return weekly_tasks;
}

export function setWeeklyTasks(map) {
    weekly_tasks = map;
}