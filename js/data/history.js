import {daily_tasks} from "./dailytasks.js";
import {currentDailyPoints} from "../calculations/daily-calc.js";

function populateTasks(type, map){
    const totals = new Map();
    map.forEach((value, id) => {
        let total = 0;
        for (let i = 0; i < 7; i++) {
            if(value.completed[i]) total +=1;
        }
        totals.set(id, total);
    });
    return totals;
}
// could use a second param like length so it works for weekly (populateDays(map, length){}
function populateDays(map){
    const daysTotal = new Map();
    for(let i = 0; i < 7; i++){
        let dayTotal = 0;
        map.forEach((value) => {
            if(value.completed[i]) {
                dayTotal += 1;
            }
        });
        daysTotal.set(i, dayTotal);
    }
    return daysTotal;
}

function sumTasks(taskMap){
    let completedTotal = 0;
    taskMap.forEach((value) =>{
        completedTotal += value;
    });
    console.log(completedTotal);
    return completedTotal;
}

function createWeekSnapshot(week){
    return {
        week,
        types: {
            daily: {
                tasks: populateTasks("daily", daily_tasks),
                days: populateDays(daily_tasks),
                totals: {
                    completedTasks: 0,
                    unfinishedTasks: 0,
                    completedPoints: 0
                },
            },
            weekly: {
                tasks: new Map(),
                totals: {
                    completedTasks: 0,
                    unfinishedTasks: 0,
                    completedPoints: 0
                },
            }
        }
    }
}

export function buildTaskHistory() {
    const dailyTasks = populateTasks("daily", daily_tasks);
    const dayTotals = populateDays(daily_tasks);
    const taskTotals = sumTasks(dailyTasks);
    const totals = new Map([["daily", {completedTasks: taskTotals, unfinishedTasks: 21 - taskTotals, completedPoints: currentDailyPoints()}]]
    );

    return {
        week: {
            types: {
                daily: {
                    tasks: dailyTasks,
                    days: dayTotals,
                    totals: totals
                }
            }
        }
    };
}
