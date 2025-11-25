import { objectives, days } from "./data.js";
import {
    sumDay,
    totalPossiblePoints,
    weeklyCompletionPercentage,
    currentPoints
} from "./calculations.js";

export function handleCheckboxChange() {
    if (objectives.size === 0) {
        days.forEach((_, i) => {
            document.getElementById(`dayTotal-${i}`).textContent = 0;
        });
        document.getElementById("completion").value = 0;
        document.getElementById("completedPointsSum").textContent = "0%";
        document.getElementById("totalPointsSum").textContent = 0;
        return;
    }

    days.forEach((_, i) => {
        document.getElementById(`dayTotal-${i}`).textContent = sumDay(i);
    });

    const weeklyPercent = weeklyCompletionPercentage();

    document.getElementById("completion").value = isFinite(weeklyPercent) ? weeklyPercent : 0;
    document.getElementById("completedPointsSum").textContent =
        (weeklyPercent * 100).toFixed(0) + "%";
    document.getElementById("totalPointsSum").textContent = totalPossiblePoints();
    document.getElementById("currTotals").textContent = currentPoints();
}
