import { daily_tasks, days } from "../data/data.js";
import { Calc } from "../calculations/calc.js";

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
    let totalPointsSum = Calc.possibleDailyPoints();
    let totalWeeklyPoints = Calc.possibleWeeklyPoints();
    $("#totalPointsSum").text(totalPointsSum);
    $("#totalWeeklyPoints").text(totalWeeklyPoints);
}
function currentPoints(){
    $("#currTotals").text(Calc.currentDailyPoints());
    $("#currentWeeklyPoints").text(Calc.currentWeeklyPoints());
}

function taskCompletion() {
    let dailyCompletion = Calc.dailyCompletion(daily_tasks);
    if(!isFinite(dailyCompletion)) dailyCompletion = 0;
    $("#dailyCompletion").val(dailyCompletion);
    const completedPointsSum = (dailyCompletion * 100).toFixed(0) + "%";
    $("#completedPointsSum").text(completedPointsSum);
}

function dailyTotal(){
    days.forEach((_, i) => {
        $("#dayTotal-"+i).text(Calc.sumDay(i));
    })
}