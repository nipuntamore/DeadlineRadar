
const calculateArea = (length, width) => length*width;
console.log(calculateArea(20,50));

daysLeft = 4;
const checkPriority = (daysLeft) => {
    if (daysLeft < 0) return "Overdue";
    if (daysLeft === 0) return "Due Today";
    if (daysLeft <= 3) return "Urgent";
    return "Upcoming";
}

console.log(checkPriority(daysLeft));

const doubleNumber = (num) => num*2

console.log(doubleNumber(10));