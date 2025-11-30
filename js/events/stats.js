import {Dom} from "./dom";
import {Statistics} from "../calculations/stats";

if (Dom.calculateStatsBtn) {
    Dom.calculateStatsBtn.addEventListener("click", () => {
        const { bestDay, bestDayPts } = Statistics.calcBestDay();
        document.getElementById("bestDay").textContent = bestDay;
        document.getElementById("bestPoints").textContent = bestDayPts;
    });
}