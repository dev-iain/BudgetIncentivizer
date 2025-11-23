const objectives = new Map();
objectives.set(1, { task:"Log expenses daily", pts: 5 });
objectives.set(2, { task:"Stay under weekly budget", pts: 50 });
objectives.set(3, { task:"Have a no-spend day", pts: 20 });

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const tableBody = document.getElementById("taskTable");


objectives.forEach((value, key) => {
    let dayCells = "";

    days.forEach((_, i) => {
        dayCells += `
            <td class="day">
                <input type="checkbox" 
                       class="checkbox-${key}" 
                       data-day="${i}" 
                       id="checkbox-${key}-${i}">
            </td>
        `;
    });

    tableBody.innerHTML += `
        <tr>
            <td class="task">${key}</td>
            <td class="description">${value.task}</td>
            <td class="points">${value.pts}</td>
            ${dayCells}
        </tr>
    `;
});


function sumDay(dayIndex) {
    let sum = 0;
    let fullSum = 0;

    objectives.forEach((value, key) => {
        fullSum += value.pts;
        const box = document.getElementById(`checkbox-${key}-${dayIndex}`);
        if (box && box.checked) {
            sum += value.pts;
        }
    });

    const proportion = sum / fullSum;
    return [sum, fullSum, proportion];
}


document.querySelectorAll("input[type='checkbox']").forEach(box => {
    box.addEventListener("change", () => {

        // update each day's total
        days.forEach((_, i) => {
            document.getElementById(`dayTotal-${i}`).textContent = sumDay(i)[0];
        });

        // overall completion = average of the 7 proportions
        let totalProp = 0;
        days.forEach((_, i) => totalProp += sumDay(i)[2]);
        totalProp /= days.length;

        document.getElementById("completion").value = totalProp;
        document.getElementById("completedPointsSum").textContent = (totalProp * 100).toFixed(0) + "%";
    });
});
