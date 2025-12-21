
import testDataJson from "./test1.json" with { type: "json" };
import {setDailyTasks} from "../js/data/dailytasks.js";
export const testData = new Map(
    testDataJson.map((task, i) => [`test-${i}`, task])
);
export function setTestData(){
    setDailyTasks(testData);
}
