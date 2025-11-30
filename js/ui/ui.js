import {daily_tasks, days, weekly_tasks} from "../data/data.js";
import {sumPoints} from "../calculations/calc.js";
import {dailyTaskCompletionPercentage} from "../calculations/daily-calc.js";
import {sumWeek} from "../calculations/weekly-calc.js";
import {possibleDailyPoints, sumDay, currentDailyPoints} from "../calculations/daily-calc.js";

export function handleCheckboxChange() {
    dailyTotal();
    taskCompletion();
    possiblePoints();
    currentPoints();
}

export const UI = {
    handleCheckboxChange
};

function possiblePoints(){
    let totalPointsSum = possibleDailyPoints();
    let totalWeeklyPoints = sumPoints(weekly_tasks);
    $("#totalPointsSum").text(totalPointsSum);
    $("#totalWeeklyPoints").text(totalWeeklyPoints);
}
function currentPoints(){
    $("#currTotals").text(currentDailyPoints());
    $("#currentWeeklyPoints").text(sumWeek(weekly_tasks));
}

function taskCompletion() {
    let dailyCompletion = dailyTaskCompletionPercentage(daily_tasks, currentDailyPoints());
    if(!isFinite(dailyCompletion)) dailyCompletion = 0;
    $("#dailyCompletion").val(dailyCompletion);
    const completedPointsSum = (dailyCompletion * 100).toFixed(0) + "%";
    $("#completedPointsSum").text(completedPointsSum);
}

function dailyTotal(){
    days.forEach((_, i) => {
        $("#dayTotal-"+i).text(sumDay(daily_tasks, i));
    })
}