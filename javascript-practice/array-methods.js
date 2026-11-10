const tasks = [
    { taskName: "DBMS Assignment", daysLeft: 2 },
    { taskName: "OS Viva", daysLeft: 0 },
    { taskName: "JavaScript Practice", daysLeft: 5 },
    { taskName: "Project Report", daysLeft: 1 },
    { taskName: "DSAA Assignment", daysLeft: 7 }
];

tasks.forEach((task)=>console.log(task.taskName));
const leftdays = tasks.map((task)=>task.daysLeft);
console.log(leftdays);
const sel_leftdays = tasks.filter((task)=>{
    return task.daysLeft <= 2;
});
console.log(sel_leftdays);

const filename = tasks.find((task)=>{
    return task.taskName === "DSAA Assignment";
});
console.log(filename);