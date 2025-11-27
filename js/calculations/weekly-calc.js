import { sumPoints } from "./points.js";

export function currentWeeklyPoints(taskMap) {
    return sumPoints(taskMap);
}

export function totalWeeklyPoints(taskMap) {
    return sumPoints(taskMap);
}

export function weeklyCompletionPercentage(taskMap, completedPoints) {
    const possible = sumPoints(taskMap);
    if (!possible) return 0;
    return completedPoints / possible;
}
export function sumWeek(taskMap) {
    let sum = 0;
    taskMap.forEach((value, id) => {
        const checkbox = document.querySelector(
            `input[data-task="${id}"]`
        );
        if (checkbox?.checked) {
            sum += value.pts;
        }
    });
    return sum;
}