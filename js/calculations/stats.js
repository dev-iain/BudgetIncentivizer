
import {sumDay} from "./daily-calc.js"
import {daily_tasks, days} from "../data/dailytasks.js";

function calcBestDay() {
    let bestDay = null;
    let bestDayPts = -Infinity;

    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        const day = days[dayIndex];
        const dayPts = sumDay(daily_tasks, dayIndex);

        if (dayPts > bestDayPts) {
            bestDay = day;
            bestDayPts = dayPts;
        }
    }

    console.log(`Best day: ${bestDay}, Points: ${bestDayPts}`);
    return { bestDay, bestDayPts };
}

export const Statistics = {
    calcBestDay
};
