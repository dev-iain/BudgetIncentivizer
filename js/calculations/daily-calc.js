import { days } from "../data/data.js";
import { sumPoints } from "./points.js";
import { sumCheckboxes} from "./calc.js";

export function sumDay(taskMap, dayIndex) {
    return sumCheckboxes(
        taskMap,
        id => `input[data-task="${id}"][data-day="${dayIndex}"]`
    );
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
