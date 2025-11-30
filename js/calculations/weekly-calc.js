import { sumPoints } from "./points.js";
import {sumCheckboxes} from "./calc.js";

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
    return sumCheckboxes(taskMap, id => `input[data-task="${id}"]`);
}