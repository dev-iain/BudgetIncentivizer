export let objectives = new Map([
    [crypto.randomUUID(), { task: "Log expenses daily", pts: 5 }],
    [crypto.randomUUID(), { task: "Stay under weekly budget", pts: 50 }],
    [crypto.randomUUID(), { task: "Have a no-spend day", pts: 20 }],
]);

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function saveData() {
    localStorage.setItem("tasks", JSON.stringify([...objectives]));
}

export function loadData() {
    const stored = localStorage.getItem("tasks");
    if (stored) {
        objectives = new Map(JSON.parse(stored));
    }
}
