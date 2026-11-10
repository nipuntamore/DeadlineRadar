const task = {
    taskName : "Complete OS Assignment",
    subject : "Operating Systems",
    daysLeft : 4,
    priority : "High",
    isCompleted : false
}


console.log(task.taskName,",", task.subject);

task.daysLeft = 2;
task.isCompleted = true;

let task1=[
    {
        taskName : "DBMS revision",
        subject : "DBMS",
        daysLeft : 3,
        priority : "High",
        isCompleted : false
    },
    {
        taskName : "Complete DSAA Assignment",
        subject : "DSAA",
        daysLeft : 2,
        priority : "High",
        isCompleted : true
    }
]

for (let i=0;i<task1.length;i++){
    console.log(task1[i].taskName);
}