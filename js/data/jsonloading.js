import {setDailyTasks} from "./dailytasks.js";
import {refreshTable} from "../ui/render.js";
import {setWeeklyTasks} from "./weeklytasks.js";
const userFile = $("#userFile");

userFile.on("change", function () {
    const files = this.files;
    loadFiles(files);
});

function loadFiles(files) {
    const file = files[0];
    file.text().then(text => {
        const data = JSON.parse(text);
        const dailyData = data.find(d => d.type === "daily");
        const weeklyData = data.find(d => d.type === "weekly");
        setDailyTasks(new Map(dailyData.tasks));
        setWeeklyTasks(new Map(weeklyData.tasks));
        refreshTable();
    });
}
