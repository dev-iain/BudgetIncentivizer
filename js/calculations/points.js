export function sumPoints(taskMap) {
    let total = 0;
    taskMap.forEach(v => total += v.pts);
    return total;
}
