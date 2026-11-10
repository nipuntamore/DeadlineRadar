let taskName = "Complete DBMS Assignment";
let daysLeft = 2;
let isCompleted = false;

if (isCompleted === true){
    console.log(taskName,"Completed");
}

else if (daysLeft<0){
    console.log(taskName,"Overdue");
}

else if (daysLeft === 0){
    console.log(taskName,"Due Today");
}

else if (daysLeft>=1 && daysLeft<=3){
    console.log(taskName,"Urgent");
}

else{
    console.log(taskName,"Upcoming");
}