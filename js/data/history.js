import {daily_tasks} from "./dailytasks.js";
import {currentDailyPoints} from "../calculations/daily-calc.js";
import {weekly_tasks} from "./weeklytasks.js";

function createWeekSnapshot(week) {
    return {
        week,
        types: {
            daily: {
                tasks: new Map(),
                days: new Map(),
                totals: {
                    completedTasks: 0,
                    unfinishedTasks: 0,
                    completedPoints: 0
                }
            },
            weekly: {
                tasks: {
                    completed: [],
                    uncompleted: []
                },
                totals: {
                    completedTasks: 0,
                    unfinishedTasks: 0,
                    completedPoints: 0
                }
            }
        }
    };
}

function aggregateDailyTasks(snapshot, dailyTasks) {
    dailyTasks.forEach((task, taskId) => {
        let completed = 0;
        let uncompleted = 0;
        for (let i = 0; i < 7; i++) {
            if (task.completed[i]){
                completed++;

            } else {
                uncompleted++;
            }
        }
        snapshot.types.daily.tasks.set(taskId, {
            completed,
            uncompleted: 7 - completed
        });
        snapshot.types.daily.totals.completedTasks += completed;
        snapshot.types.daily.totals.unfinishedTasks += uncompleted;
    });

}

function pointsForDayFromTasks(dailyTasks, dayIndex) {
    let points = 0;
    dailyTasks.forEach(task => {
        if (task.completed[dayIndex]) points += task.pts;
    });
    return points;
}

function aggregateDailyDays(snapshot, dailyTasks) {
    for (let day = 0; day < 7; day++) {
        let completed = 0;

        dailyTasks.forEach(task => {
            if (task.completed[day]) completed++;
        });

        snapshot.types.daily.days.set(day, {
            completed,
            uncompleted: dailyTasks.size - completed,
            points: pointsForDayFromTasks(dailyTasks, day)
        });
    }
}


function aggregateWeeklyTasks(snapshot, weeklyTasks) {
    weeklyTasks.forEach((task, id) => {
        if (task.completed) {
            snapshot.types.weekly.tasks.completed.push(id);
            snapshot.types.weekly.totals.completedTasks++;
            snapshot.types.weekly.totals.completedPoints += task.points;
        } else {
            snapshot.types.weekly.tasks.uncompleted.push(id);
            snapshot.types.weekly.totals.unfinishedTasks++;
        }
    });
}

export function buildWeekSnapshotFromTasks(week) {
    const snapshot = createWeekSnapshot(week);

    aggregateDailyTasks(snapshot, daily_tasks);
    aggregateDailyDays(snapshot, daily_tasks);
    aggregateWeeklyTasks(snapshot, weekly_tasks);

    snapshot.types.daily.totals.completedPoints = currentDailyPoints();
    console.log(snapshot);
    return snapshot;
}

