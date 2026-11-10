const tasks = [
    { taskName: "DBMS Assignment", daysLeft: 2 },
    { taskName: "OS Viva", daysLeft: 0 },
    { taskName: "JavaScript Practice", daysLeft: 5 },
    { taskName: "Project Report", daysLeft: 1 }
];

tasks.forEach((task)=>{
    console.log(task.taskName);
});

const tasksname = tasks.map(tasks => tasks.taskName);
console.log(tasksname);

const urgentTasks = tasks.filter(task=>{
    return task.daysLeft < 2;
});
console.log(urgentTasks);

const result = tasks.find((task)=>{
    return task.taskName === "OS Viva";
});

console.log(result);