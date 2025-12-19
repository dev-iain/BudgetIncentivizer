import {getWeek} from "./date.js"
import {daily_tasks, dailyTasksStatus, days, saveDailyTaskStatus} from "./dailytasks.js";
import {saveWeeklyTaskStatus, weekly_tasks, weeklyTasksStatus} from "./weeklytasks.js";


function saveMap(key, map) {
    localStorage.setItem(key, JSON.stringify([...map]));
}

function loadMap(key, map) {
    const stored = localStorage.getItem(key);
    if (!stored) return false;

    const entries = JSON.parse(stored);
    map.clear();
    for (const [id, value] of entries) {
        map.set(id, value);
    }
    return true;
}

export function saveData() {
    saveMap("dailyTasks", daily_tasks);
    saveMap("weeklyTasks", weekly_tasks);
    saveMap("dailyTasksStatus", saveDailyTaskStatus());
    saveMap("weeklyTasksStatus", saveWeeklyTaskStatus());
}

export function refreshWeek(resetDay = 0){
    const today = new Date();
    const day = today.getDay();
    if(day!== resetDay) return;

    const year = today.getFullYear();
    const week = getWeek(today);
    const currentKey = `${year}-W${week}`;

    const lastRefresh = localStorage.getItem("lastRefreshWeek");
    if(lastRefresh !== currentKey){
        localStorage.clear();// this is where to add the history
        localStorage.setItem("lastRefreshWeek", currentKey);
    }
}

export function loadData() {
    loadMap("dailyTasks", daily_tasks);
    loadMap("weeklyTasks", weekly_tasks);
    loadMap("dailyTasksStatus", dailyTasksStatus);
    loadMap("weeklyTasksStatus", weeklyTasksStatus);
}

export const Data = {
    daily_tasks,
    weekly_tasks,
    days,
    saveData,
    loadData,
    saveDailyTaskStatus,
    dailyTasksStatus,
    weeklyTasksStatus
};