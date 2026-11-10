const tasks = [
    {
        taskName : "DBMS Assignment",
        daysLeft : 2,
        isCompleted : false
    },
    {
        taskName : "OS viva",
        daysLeft : 0,
        isCompleted : false
    },
    {
        taskName : "Javascript Practice",
        daysLeft : -1,
        isCompleted : true
    }
]

function checkPriority(daysLeft, isCompleted){
    if (isCompleted){
        return "Completed";
    }
    else if (daysLeft<0){
        return "Overdue";
    }
    else if (daysLeft === 0){
        return "Due Today";
    }
    else if (daysLeft <= 3){
        return "Urgent";
    }
    else{
        return "Upcoming"
    }
}

for (let i = 0; i<tasks.length; i++){
    console.log(tasks[i].taskName,"-",checkPriority(tasks[i].daysLeft,tasks[i].isCompleted));
}