const oldTasks = ["DBMS", "OS", "DSAA"];
console.log(oldTasks);
const newTasks = [...oldTasks, "JavaScript"];
console.log(newTasks);


const task = {
    taskName: "Complete OS Assignment",
    daysLeft: 4,
    priority: "Medium"
};
console.log(task);


const updatedTask = {
    ...task,
    daysLeft: 2,
    priority: "High"    
};
console.log(updatedTask);
