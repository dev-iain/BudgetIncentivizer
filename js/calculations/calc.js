export const Calc = {
    sumCheckboxes,
    completionPercentage,
    sumPoints
};

export function sumCheckboxes(taskMap, selectors) {
    let sum = 0;
    taskMap.forEach((value, id) => {
        const checkbox = document.querySelector(selectors(id));
        if (checkbox?.checked) {
            sum += value.pts;
        }
    });
    return sum;
}

export function completionPercentage(taskMap, completedPoints, type) {
    const possible = sumPoints(taskMap);
    if (!possible) return 0;
    const percentage = completedPoints/possible;
    return (type === "daily") ? percentage/7 : percentage;
}

export function sumPoints(taskMap) {
    let total = 0;
    taskMap.forEach(v => total += v.pts);
    return total;
}