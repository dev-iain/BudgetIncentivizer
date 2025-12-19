const d = new Date();
// ISO JS format: year, month, day

export function getFullDate(){
    //return d.toDateString();
    return d.toLocaleDateString("en-US", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
}

export function getDay(){
    let date = new Date();
    return date.getDay();
}

export function getWeekMonth(){
    let date = new Date();
}

export function getWeek(date){
    const janFirst = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date-janFirst)/ 86400000);
    return Math.ceil((days + janFirst.getDay() + 1) / 7);
}