const taskHistory = new Map();

function addTaskHistory(date, dailyMap, weeklyMap){
    taskHistory.set(date, {daily: dailyMap, weekly: weeklyMap});
}

function populateTaskHistory(date, dailyMap){}