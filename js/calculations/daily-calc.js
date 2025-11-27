import { days } from "../data/data.js";
import { sumPoints } from "./points.js";

export function sumDay(taskMap, dayIndex) {
    let sum = 0;
    taskMap.forEach((value, id) => {
        const checkbox = document.querySelector(
            `input[data-task="${id}"][data-day="${dayIndex}"]`
        );
        if (checkbox?.checked) {
            sum += value.pts;
        }
    });
    return sum;
}

export function totalPossibleDailyPoints(taskMap) {
    return sumPoints(taskMap) * days.length;
}

export function weeklyDailyCompletionPercentage(taskMap) {
    const possible = totalPossibleDailyPoints(taskMap);
    if (!possible) return 0;

    let completed = 0;
    days.forEach((_, i) => completed += sumDay(taskMap, i));

    return completed / possible;
}

export function currentDailyPoints(taskMap) {
    return sumPoints(taskMap);
}
