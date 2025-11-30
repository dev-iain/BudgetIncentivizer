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

export function completionPercentage(taskMap, completedPoints) {
    const possible = sumPoints(taskMap);
    if (!possible) return 0;
    return completedPoints / possible;
}

export function sumPoints(taskMap) {
    let total = 0;
    taskMap.forEach(v => total += v.pts);
    return total;
}