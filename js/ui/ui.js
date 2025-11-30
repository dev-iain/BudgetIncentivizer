import { daily_tasks, days } from "../data/data.js";
import { Calc } from "../calculations/calc.js";

export function handleCheckboxChange() {
    if (daily_tasks.size === 0) {
        days.forEach((_, i) => {
            document.getElementById(`dayTotal-${i}`).textContent = 0;
        });
        document.getElementById("dailyCompletion").value = 0;
        document.getElementById("completedPointsSum").textContent = "0%";
        document.getElementById("totalPointsSum").textContent = 0;
        return;
    }

    days.forEach((_, i) => {
        document.getElementById(`dayTotal-${i}`).textContent = Calc.sumDay(i);
    });

    const weeklyPercent = Calc.dailyCompletion(daily_tasks);

    document.getElementById("dailyCompletion").value = isFinite(weeklyPercent) ? weeklyPercent : 0;
    document.getElementById("completedPointsSum").textContent =
        (weeklyPercent * 100).toFixed(0) + "%";
    //possiblePoints();
    document.getElementById("totalPointsSum").textContent = Calc.possibleDailyPoints();
    document.getElementById("currTotals").textContent = Calc.currentDailyPoints();
    document.getElementById("currentWeeklyPoints").textContent = Calc.currentWeeklyPoints();
    document.getElementById("totalWeeklyPoints").textContent = Calc.possibleWeeklyPoints();
}

export const UI = {
    handleCheckboxChange
};
function dailyTasks(){

}
// function possiblePoints(){
//     $("#totalPointsSum").textContent = Calc.possibleDailyPoints();
//     $("#totalWeeklyPoints").textContent = Calc.possibleWeeklyPoints();
// }