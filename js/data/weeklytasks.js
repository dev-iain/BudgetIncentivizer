import {Data} from "./data.js";

export const weekly_tasks = new Map([]);
export const weeklyTasksStatus = new Map();

export function saveWeeklyTaskStatus() {
    weeklyTasksStatus.clear();
    Data.weekly_tasks.forEach((value, id) => {
        const checkbox = $(`input[data-task='${id}']`);
        let taskStatus = checkbox.is(":checked");
        weeklyTasksStatus.set(id, {status: taskStatus});
    });
    return weeklyTasksStatus;
}