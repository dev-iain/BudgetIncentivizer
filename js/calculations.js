import { objectives, days } from "./data.js";

export function sumDay(dayIndex) {
    let sum = 0;

    objectives.forEach((value, id) => {
        const checkbox = document.querySelector(
            `input[data-task="${id}"][data-day="${dayIndex}"]`
        );
        if (checkbox?.checked) {
            sum += value.pts;
        }
    });

    return sum;
}

export function totalPossiblePoints() {
    let total = 0;
    objectives.forEach(v => total += v.pts);
    return total * days.length;
}

export function weeklyCompletionPercentage() {
    let totalPossible = totalPossiblePoints();
    if (totalPossible === 0) return 0;

    let completed = 0;

    days.forEach((_, i) => completed += sumDay(i));

    return completed / totalPossible;
}

export function currentPoints() {
    let currTotal = 0;
    for (let i = 0; i < days.length; i++) {
        currTotal += sumDay(i);
    }
    return currTotal;
}
