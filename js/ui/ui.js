import {saveData} from "../data/data.js";
import {completionPercentage, sumPoints} from "../calculations/calc.js";
import {sumWeek} from "../calculations/weekly-calc.js";
import {possibleDailyPoints, sumDay, currentDailyPoints} from "../calculations/daily-calc.js";
import {getFullDate} from "../data/date.js";
import {daily_tasks, days, saveDailyTaskStatus} from "../data/dailytasks.js";
import {saveWeeklyTaskStatus, weekly_tasks} from "../data/weeklytasks.js";

export function handleCheckboxChange() {
    dailyTotal();
    taskCompletion();
    possiblePoints();
    currentPoints();
    saveDailyTaskStatus();
    saveWeeklyTaskStatus();
    setDate();
    saveData();
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
    let dailyCompletion = completionPercentage(daily_tasks, currentDailyPoints(), "daily");
    if(!isFinite(dailyCompletion)) dailyCompletion = 0;
    $("#dailyCompletion").val(dailyCompletion);
    const completedPointsSum = (dailyCompletion * 100).toFixed(0) + "%";
    $("#completedPointsSum").text(completedPointsSum);
}
function setDate(){
    $("#currentDate").text(getFullDate());
}
function dailyTotal(){
    days.forEach((_, i) => {
        $("#dayTotal-"+i).text(sumDay(daily_tasks, i));
    })
}