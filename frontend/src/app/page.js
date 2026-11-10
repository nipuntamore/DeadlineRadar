"use client";
import { useState, useEffect } from "react";
import TaskCard from "./components/TaskCard";
import Sidebar from "./components/Sidebar";
import Radar from "./components/Radar";

export default function Home(){
  const studentName = "Nipun";
  const appName = "DeadlineRadar";

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("")
  useEffect(()=>{
    async function fetchTasks() {
      try{
        const response = await fetch("http://localhost:8000/api/tasks/");
      
      if (!response.ok){
        throw new error("Failed to fetch tasks");
      }
      const data = await response.json();
      const formattedTasks = data.map(task=>({
        id: task.id,
        taskName: task.task_name,
        dueDate: task.due_date,
        priority: task.priority,
        isCompleted: task.is_completed
      }));
      setTasks(formattedTasks);
    }
    catch(err){
      console.error(err);
      setError("Could not load tasks please try again");
    }
    finally{
      setIsLoading(false)
    }
  }
  fetchTasks();
},[]);

  const totalTasks = tasks.length;
  
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editingPriorityId, setEditingPriorityId] = useState(null);
  const [newPriority, setNewPriority] = useState("Medium")

  async function handleAddTask(){
    if (taskName.trim() === "" || dueDate === ""){
      return;
    }
    try{
      const response = await fetch(
        "http://localhost:8000/api/tasks/",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            task_name : taskName,
            due_date : dueDate,
            priority : priority,
            is_completed : false
          })
        }
      );
      if (!response.ok){
        const errorData = await response.text();

        console.log("Status:", response.status);
        console.log("Django error:", errorData);

        throw new Error("Failed to create task");
      }
      const data = await response.json();
      
      const newTask = {
        id : data.id,
        taskName : taskName,
        dueDate: dueDate,
        priority: priority,
        isCompleted: false
      }
      setTasks(prev => [...prev,newTask]);
      setTaskName("");
      setDueDate("");
      setPriority("Medium");
      setError("");
    }
    catch(err){
      console.error(err);
      setError("Could not save task. Try again")
    }

  }

  async function handleDeleteTask(id){
    try{
      const response = await fetch(
        `http://localhost:8000/api/tasks/${id}/`,
        {
          method:"DELETE"
        }
      );
      if (!response.ok){
        throw new Error("Failed to delete task");
      }
      setTasks(prev => prev.filter(task=> task.id !== id))
    }
    catch(err){
      console.error(err);
      setError("Could not delete task. Please try again");
    }
  }

  async function handleToggleTask(id){
    const selectedTask = tasks.find(task=>task.id === id);
    if (!selectedTask) return;

    const updatedStatus = !selectedTask.isCompleted;
    try{
      const response = await fetch(
        `http://localhost:8000/api/tasks/${id}/`,
        {
          method :"PATCH",
          headers : {
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
            is_completed: updatedStatus
          })
        }
      );
      if (!response.ok){
        throw new error("Failed to update task");
      }
      setTasks(prev=>prev.map(task => {if (task.id === id){
        return {
        ...task,
        isCompleted:!task.isCompleted
        };
      }
      return task;
      }));
          
    }
    catch(err){
      console.error(err);
      setError("Could not update task. Please try again");
    }
  }

  function getSuggestedPriority(days){
    
    if (days <= 3){
      return "Urgent";
    }
    else if (days <= 7){
      return "High";
    }
    else if (days <= 14){
      return "Medium";
    }
    else{
      return "Low";
    }
  }
  
function handleEditPriority(id){
  const selectedTask = tasks.find(task=>task.id === id);
  setEditingPriorityId(id);
  setNewPriority(selectedTask.priority)
}

async function handleSavePriority(id){
  try{
    const response = await fetch (
      `http://localhost:8000/api/tasks/${id}/`,
      {
        method : "PATCH",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          priority : newPriority
        })
      }
    );
    if (!response.ok){
      throw new Error("Failed to update priority");
    }
    setTasks(prev => prev.map(task=>task.id === id ? {...task, priority : newPriority}:task));
    setEditingPriorityId(null)
    setError("");
  }
  catch(err){
    console.error(err);
    setError("Could not update priority. Pllease try again.")
  }
}

async function handleSaveTaskDetails(id, editedTaskname, editedDueDate){
  if (editedTaskname ===""  || editedDueDate === ""){
    setError("Task Name and due date required.");
    return false;
  }
  try{
    const response = await fetch(
      `http://localhost:8000/api/tasks/${id}/`,
      {
        method : "PATCH",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify({
          task_name : editedTaskname.trim(),
          due_date : editedDueDate
        })
      }
    );
    if (!response.ok){
      throw new Error("Failed to update Tassk Details");
    }
    setTasks(prev=>prev.map(task=>task.id === id?{...task,taskName:editedTaskname,dueDate:editedDueDate}:task));
    setError("");
    return true;
  }
  catch(err){
    console.error(err);
    setError("Could not update task details. Please try again later");
    return false;
  }
  
}

function handleCancelPriority(){
  setEditingPriorityId(null);
}

function calculateDaysLeft(dueDate){
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [year, month, day] = dueDate.split("-").map(Number);
    const deadline = new Date(year, month - 1, day);
    deadline.setHours(0, 0, 0, 0);
    const difference = deadline.getTime()-today.getTime();
    const daysLeft = Math.ceil(difference/(24*60*60*1000))
    return daysLeft;
}

const completedTasks = tasks.filter(task=> task.isCompleted).length;
const pendingTasks = tasks.filter(task=> !task.isCompleted).length;
const overdueTasks = tasks.filter(task=>calculateDaysLeft(task.dueDate)<0 && !task.isCompleted).length;

  return(
    <div className="flex min-h-screen">
      <Sidebar/>
      <main className="flex-1 min-w-0 px-6 pb-6 pt-20 md:p-6">
        <h1 className="text-4xl font-bold text-blue-500">{appName}</h1>
        <h2>Welcome back {studentName}!</h2>
        <p>Your Deadlines. Your Control.</p>
        <p>Manage your tasks. Stay ahead.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6 ">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
            <p className="text-sm text-slate-400">Total Tasks</p>
            <h2 className="text-3xl font-bold mt-2 text-cyan-400">{totalTasks}</h2>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
            <p className="text-sm text-slate-400">Completed Tasks</p>
            <h2 className="text-3xl font-bold mt-2 text-emerald-400">{completedTasks}</h2>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
            <p className="text-sm text-slate-400">Pending Tasks</p>
            <h2 className="text-3xl font-bold mt-2 text-purple-400">{pendingTasks}</h2>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white">
            <p className="text-sm text-slate-400">Overdue Tasks</p>
            <h2 className="text-3xl font-bold mt-2 text-rose-400">{overdueTasks}</h2>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-6 mb-6 w-full">
          <h2 className="text-xl font-semibold text-white mb-5">
            Add a New Task
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            <input
              className="md:col-span-2 w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              type="text"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              className="w-full min-w-0 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              type="date"
              placeholder="Due Date"
              value={dueDate}
              onChange={(e) => {const value = e.target.value;
                setDueDate(value);

                if (value!==""){
                  setPriority(getSuggestedPriority(calculateDaysLeft(value)));
                }
              }}

            />
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button className="md:col-span-2 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-3 rounded-lg transition" onClick={handleAddTask}>
            Add task
            </button>
          </div>
        </div>
        <Radar
          tasks = {tasks}
          calculateDaysLeft = {calculateDaysLeft}
        />
        {isLoading && <p>Loading tasks...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {isLoading && !error && tasks.length === 0 && (
          <p>No tasks yet. Add your first task</p>
        )}
        {tasks.map((task)=>(
          <TaskCard
          id = {task.id}
          key={task.id}
          taskName={task.taskName}
          daysLeft={calculateDaysLeft(task.dueDate)}
          priority={task.priority}
          suggestedPriority={getSuggestedPriority(calculateDaysLeft(task.dueDate))}
          isCompleted={task.isCompleted}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
          onEditPriority={handleEditPriority}
          isEditingPriority = {editingPriorityId === task.id}
          newPriority={newPriority}
          onPriorityChange={setNewPriority}
          onSavePriority={handleSavePriority}
          onCancelPriority={handleCancelPriority}
          dueDate={task.dueDate}
          onSaveTaskDetails={handleSaveTaskDetails}
          />        
        ))}
        
      </main>
    </div>
  );
}