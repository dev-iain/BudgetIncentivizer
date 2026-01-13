import {daily_tasks} from "./dailytasks.js";
import {weekly_tasks} from "./weeklytasks.js";

export function downloadData(map, filename) {
    const dataArray =[
        {
            "type": "daily",
            "tasks": [...daily_tasks]
        },
        {
            "type": "weekly",
            "tasks": [...weekly_tasks]
        }
    ];
    const jsonString = JSON.stringify(dataArray, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}