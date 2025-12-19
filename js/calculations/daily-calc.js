import {sumCheckboxes, completionPercentage, sumPoints} from "./calc.js";
import {daily_tasks, days} from "../data/dailytasks.js";

export function sumDay(taskMap, dayIndex) {
    return sumCheckboxes(
        taskMap,
        id => `input[data-task="${id}"][data-day="${dayIndex}"]`
    );
}

export function possibleDailyPoints(){
    return sumPoints(daily_tasks) * 7;
}

export function currentDailyPoints(){
    let total = 0;
    for (let i = 0; i < days.length; i++) {
        total += sumDay(daily_tasks, i);
    }
    return total;
}