import {Data} from "./data.js";

export const daily_tasks = new Map([
    [crypto.randomUUID(), {task: "Log expenses daily", pts: 5, type: "daily"}],
    [crypto.randomUUID(), {task: "Stay under weekly budget", pts: 50, type: "daily"}],
    [crypto.randomUUID(), {task: "Have a no-spend day", pts: 20, type: "daily"}]
]);
export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const dailyTasksStatus = new Map();

export function saveDailyTaskStatus() {
    dailyTasksStatus.clear();
    Data.daily_tasks.forEach((value, id) => {
        let days = [];

        for (let i = 0; i < Data.days.length; i++) {
            const checkbox = $(`input[data-task='${id}'][data-day='${i}']`);
            days[i] = checkbox.is(":checked");
        }
        dailyTasksStatus.set(id, {days});
    });
    return dailyTasksStatus;
}