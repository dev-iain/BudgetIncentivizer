import {Statistics} from "../calculations/stats.js";

$("#calculateStats").on("click", function () {
    const { bestDay, bestDayPts } = Statistics.calcBestDay();
    $("#bestDay").text(bestDay);
    $("#bestPoints").text(bestDayPts);
});
