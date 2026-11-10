//const today = new Date();
//const deadline = new Date("2026-11-12");

//console.log(today);
//console.log(deadline);
//const diff = deadline.getTime()-today.getTime();
//const daysLeft = Math.ceil(diff/(24*60*60*1000))
//console.log(daysLeft)

function calculateDaysLeft(dueDate){
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(dueDate);
    deadline.setHours(0, 0, 0, 0);
    const difference = deadline.getTime()-today.getTime();
    const daysLeft = Math.ceil(difference/(24*60*60*1000))
    return daysLeft;
}
console.log(calculateDaysLeft("2026-11-12"));