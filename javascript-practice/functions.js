function checkPriority(daysLeft){

    if (daysLeft<0){
        return "Overdue";
    }

    else if (daysLeft === 0){
        return "Due Today";
    }

    else if (daysLeft>=1 && daysLeft<=3){
        return "Urgent";
    }
    else{
        return "Upcoming";
    }
}
console.log(checkPriority(-2));
console.log(checkPriority(0));
console.log(checkPriority(2));
console.log(checkPriority(10));