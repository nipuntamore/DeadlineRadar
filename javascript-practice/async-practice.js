function addTasks(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve("Tasks added");
        },2000);
    });
}

async function showTasks() {
    console.log("adding task...");
    const result = await addTasks();
    console.log(result);
}

showTasks();