export let daily_tasks = new Map();
export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function saveDailyTaskStatus() {
    daily_tasks.forEach((value, id) => {
        let daysList = [];

        for (let i = 0; i < days.length; i++) {
            const checkbox = $(`input[data-task='${id}'][data-day='${i}']`);
            daysList[i] = checkbox.is(":checked");
        }
        daily_tasks.set(id, {
            ...daily_tasks.get(id),
            completed: daysList
        });
    });
    return daily_tasks;
}

export function setDailyTasks(map){
    daily_tasks = map;
}