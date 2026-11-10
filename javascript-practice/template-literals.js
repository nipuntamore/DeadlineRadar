const taskName = "Complete DBMS Assignment";
const subject = "DBMS";
const daysLeft = 3;
const priority = "High";

console.log(`
    Task:${taskName}
    subject:${subject}
    Days Left:${daysLeft}
    Priority:${priority}`);

const totalTasks = 10;
let completedTasks = 4;
console.log(`You have completed ${completedTasks} out of ${totalTasks} tasks. `);
console.log(`remaining tasks: ${totalTasks-completedTasks}`);