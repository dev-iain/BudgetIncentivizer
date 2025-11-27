import { daily_tasks, weekly_tasks, days } from "../data/data.js";
import * as Daily from "./daily-calc.js";
import * as Weekly from "./weekly-calc.js";
import { sumPoints } from "./points.js";

export const Calc = {
    sumDay: i => Daily.sumDay(daily_tasks, i),
    currentDailyPoints: () => {
        let total = 0;
        for (let i = 0; i < days.length; i++) {
            total += Daily.sumDay(daily_tasks, i);
        }
        return total;
    },

    possibleDailyPoints: () => sumPoints(daily_tasks) * days.length,
    dailyCompletion: () => Daily.weeklyDailyCompletionPercentage(daily_tasks),

    currentWeeklyPoints: () => {
        return Weekly.sumWeek(weekly_tasks);
    },
    possibleWeeklyPoints: () => sumPoints(weekly_tasks),
    weeklyCompletion: () => Weekly.weeklyCompletionPercentage(
        weekly_tasks,
        sumPoints(weekly_tasks)
    ),

    combinedPoints: () => sumPoints(daily_tasks) + sumPoints(weekly_tasks)
};
