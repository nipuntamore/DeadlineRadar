"use client"
import {useState,useEffect} from "react";

export default function Tasks(){
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("")
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(()=>{
        async function fetchTasks(){
            try{
                const response = await fetch(
                    "http://localhost:8000/api/tasks/"
                );
                if (!response.ok){
                    throw new Error("Failed to fetch Tasks");
                }
                const data = await response.json();
                setTasks(data);
            }
            catch(error){
                console.error("Error fetching Tasks", error)
            }
            finally {
                setIsLoading(false);
            }
        }fetchTasks();
    },[]);

    const filteredTasks = tasks.filter((task)=>
        task.task_name.toLowerCase().includes(
            searchTerm.toLowerCase()
        )
    );

    function getDisplayedTasks() {
        const displayedTasks = filteredTasks.filter((task)=>{
        if (activeFilter === "All") {
            return true;
        }
        if (activeFilter === "Pending") {
            return !task.is_completed;}
        if (activeFilter === "Completed") {
            return task.is_completed;
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dueDate = new Date(task.due_date + "T00:00:00");
        return dueDate < today && !task.is_completed;

        });
        return displayedTasks;
    }
    const displayedTasks = getDisplayedTasks();
    

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">My Tasks</h1>
            <p className="text-slate-400">Manage all your deadlines in one place</p>
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
            <select
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
            
<div className="space-y-4">
    {isLoading ? (
        <p className="text-slate-400">Loading tasks...</p>
    ) : displayedTasks.length === 0 ? (
        <p className="text-slate-400">
            No tasks found. Try changing your search or filter.
        </p>
    ) : (
        displayedTasks.map((task) => (
            <div
                key={task.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-700 bg-slate-800/70 p-5 transition hover:border-cyan-500/50 sm:flex-row sm:items-center sm:justify-between"
            >
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">
                        {task.task_name}
                    </h3>
                    <p className="text-sm text-slate-400">
                        {task.due_date}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-purple-500/15 px-3 py-1 text-sm text-purple-400">
                        {task.priority}
                    </span>

                    <span className={`rounded-full px-3 py-1 text-sm ${
                        task.is_completed
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-amber-500/15 text-amber-400"
                    }`}>
                        {task.is_completed ? "Completed" : "Pending"}
                    </span>
                </div>
                </div>
                    ))
                )}
            </div>

        </div>
        
    );
}