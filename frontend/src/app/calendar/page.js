"use client"
import { useState,useEffect } from "react";

export default function calendar(){
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const [currentDate, setCurrentDate] = useState(new Date(2026,10,1));
    const [selectedTask, setSelectedTask] = useState(null)

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    function goToPreviousMonth(){
        setCurrentDate(new Date(year, month-1, 1));
    }
    function goToNextMonth(){
        setCurrentDate(new Date(year, month+1, 1));
    }

    const daysInMonth = new Date(year, month+1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++){
        calendarDays.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++){
        calendarDays.push(day);
    }
    while (calendarDays.length % 7 !== 0) {
        calendarDays.push(null);
    }

    const [tasks, setTasks] = useState([]);
    useEffect(()=>{
        async function fetchTasks(){
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/`);

                if (!response.ok){
                    throw new Error("Failed to fetch tasks");
                }
                const data = await response.json();
                const formattedTasks = data.map(task=>({
                    id:task.id,
                    taskName:task.task_name,
                    dueDate:task.due_date,
                    priority:task.priority,
                    isCompleted:task.is_completed
                }));
                setTasks(formattedTasks);
            }
            catch(error){
                console.error("Error fetching tasks:",error)
            }
        }
        fetchTasks();
    },[]);

    return(
        <div className="text-white p-2 md:p-4">
            <div className="flex items-center justify-between mb-6">
                <button onClick={goToPreviousMonth} className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700">← Previous</button>
                <h1 className="text-3xl font-bold mb-6">
                    {currentDate.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric"
                    })}
                </h1>

                <button onClick={goToNextMonth} className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700">Next →</button>
            </div>
            <div className="grid grid-cols-7 gap-3">

                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day)=>(<div key={day} className="text-center font-bold text-cyan-400 py-3">{day}</div>))}
                {calendarDays.map((day,index)=>{
                    const today = new Date().toISOString().split("T")[0];
                    const dateKey = day
                    ? `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`
                    : null;

                    let isToday = false;

                    if (dateKey === today){
                        isToday = true
                    }

                    const dayTasks = day
                        ? tasks.filter(task => task.dueDate === dateKey)
                        :[];
                    return (
                        <div
                            key={index}
                            className={`min-h-28 rounded-xl p-3 border ${
                                isToday
                                    ? "border-cyan-400 bg-cyan-500/10"
                                    : "border-slate-700 bg-slate-800"
                            }`}
                        >
                            {day && <div className="font-bold mb-2">{day}</div>}
                            <div className="space-y-1">
                               {dayTasks.map(task => (
                                <div 
                                    onClick={() => setSelectedTask(task)}
                                    key={task.id}
                                    className={`text-xs p-2 rounded-md ${
                                        task.isCompleted
                                        ? "bg-slate-700 text-slate-400 line-through opacity-60"
                                        :task.priority === "Urgent"
                                        ? "bg-red-500/20 text-red-400"
                                        : task.priority === "High"
                                        ? "bg-orange-500/20 text-orange-400"
                                        : task.priority === "Medium"
                                        ? "bg-purple-500/20 text-purple-400"
                                        : "bg-cyan-500/20 text-cyan-400"
                                    }`}
                                >
                                    {task.taskName}
                                </div>
                               ))} 
                            </div>
                        </div>
                    );
                })}

            </div>
            {selectedTask && (
                <div className="mt-6 bg-slate-800 border border-cyan-500/30 rounded-xl p-6">
                    <button className="text-rose-400 mb-3" onClick={() => setSelectedTask(null)}>
                        ✕ Close
                    </button>
                    <h2 className="text-xl font-bold text-cyan-400 mb-4" >{selectedTask.taskName}</h2>
                    <p>Priority: {selectedTask.priority}</p>
                    <p>Due Date: {selectedTask.dueDate}</p>
                    <p>Status: {selectedTask.isCompleted ? "Completed" : "Pending"}</p>
                </div>
            )}
            <p>Tasks loaded: {tasks.length}</p>
        </div>
    );
}