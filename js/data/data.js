export const daily_tasks = new Map([
    [crypto.randomUUID(), { task: "Log expenses daily", pts: 5, type: "daily" }],
    [crypto.randomUUID(), { task: "Stay under weekly budget", pts: 50, type: "daily" }],
    [crypto.randomUUID(), { task: "Have a no-spend day", pts: 20, type: "daily" }]
]);

export const weekly_tasks = new Map([]);

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
    saveMap("daily tasks", daily_tasks);
    saveMap("weekly_tasks", weekly_tasks);
}

export function loadData() {
    loadMap("daily tasks", daily_tasks);
    loadMap("weekly_tasks", weekly_tasks);
}
export const Data = {
    daily_tasks,
    weekly_tasks,
    days,
    saveData,
    loadData
};