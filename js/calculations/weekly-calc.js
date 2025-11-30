import {completionPercentage, sumCheckboxes} from "./calc.js";

export function weeklyCompletionPercentage(taskMap, completedPoints) {
    return completionPercentage(taskMap, completedPoints);
}

export function sumWeek(taskMap) {
    return sumCheckboxes(taskMap, id => `input[data-task="${id}"]`);
}