import { days} from "../data/data.js";
import { Calc } from "./calc.js";

function calcBestDay() {
    let bestDay = null;
    let bestDayPts = -Infinity;

    for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        const day = days[dayIndex];
        const dayPts = Calc.sumDay(dayIndex);

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
