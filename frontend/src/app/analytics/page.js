"use client";

import { useState, useEffect } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,

}from "recharts";

function getRelativeTime(timestamp){
    const timeNow = Date.now();
    const timeThen = new Date(timestamp).getTime();
    const diff = timeNow - timeThen;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(minutes / 1440);

    if (minutes<1){
        return "Just now"
    }
    else if (minutes<60){
        return `${minutes} minutes ago`
    }
    else if (minutes<1440){
        return `${hours} hours ago`
    }
    else{
        return `${days} days ago`
    }
}

export default function Analytics(){
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const completedTasks = tasks.filter((task)=>task.is_completed).length;
    const pendingTasks = tasks.filter((task)=>!task.is_completed).length;
    const totalTasks = tasks.length;
    const overdueTasks = tasks.filter((task)=>{
        const today = new Date();
        const dueDate = new Date(task.due_date + "T00:00:00");
        today.setHours(0,0,0,0);
        return dueDate < today && !task.is_completed;
    }).length;
    const completionRate = totalTasks === 0
    ? 0
    : Math.round((completedTasks/totalTasks)*100);

    useEffect(()=>{
        async function fetchTasks() {
            try{
                const response = await fetch(
                    "http://localhost:8000/api/tasks/"
                );
                if (!response.ok){
                    throw new Error("Failed to fetch tasks");            
                }
                const data = await response.json();
                setTasks(data);
            }
            catch (error){
                console.error(error);
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchTasks();
    },[]);

    const priorityData = [
        {
            name: "Urgent",
            value: tasks.filter(task => task.priority === "Urgent").length
        },
        {
            name: "High",
            value: tasks.filter(task => task.priority === "High").length
        },
        {
            name:"Medium",
            value: tasks.filter(task => task.priority === "Medium").length
        },
        {
            name: "Low",
            value: tasks.filter(task => task.priority === "Low").length
        }
    ];
    const COLORS = ["#f43f5e", "#f97316", "#a855f7", "#06b6d4"];

    const last7Days = Array.from({length:7},(_, index) => {
        const date = new Date();
        date.setDate(date.getDate()-(6-index));
        return date;
    });
    const productivityData = last7Days.map(date=>{
        const dateKey = [
            date.getFullYear(),
            String(date.getMonth()+1).padStart(2,"0"),
            String(date.getDate()).padStart(2,"0")
        ].join("-");

        const count = tasks.filter(task =>
            task.created_at.startsWith(dateKey)
        ).length;
        return{
                day: date.toLocaleDateString("en-IN",{
                    weekday: "short"
                }),
                tasks : count
            };
    });

    const [activities, setActivities] = useState([]);
    useEffect(()=>{
        async function fetchActivities(){
            try{
                const response = await fetch(
                    "http://localhost:8000/api/activities/"
                );
                if (!response.ok){
                        throw new Error("Failed to fetch activities");            
                    }
                const data = await response.json();
                setActivities(data);
            }
            catch(error){
                console.error("Error fetching activities",error)
            }
        }
        fetchActivities();
    },[]);

    return (
        <div className="text-white">
            <h1 className="text-3xl font-bold">
                Analytics Dashboard
            </h1>
            <p className="text-slate-400 mt-2">
                Understand Your productivity and workload
            </p>
            {isLoading ? (
                <p>Loading analytics...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
                        <div className="bg-slate-800 p-5 rounded-xl">
                            <p className="text-slate-400">Total Tasks</p>
                            <h2 className="text-3xl font-bold mt-2">{totalTasks}</h2>
                        </div>
                        <div className="bg-slate-800 p-5 rounded-xl">
                            <p className="text-slate-400">Completed</p>
                            <h2 className="text-3xl font-bold text-emerald-400 mt-2">{completedTasks}</h2>
                        </div>
                        <div className="bg-slate-800 p-5 rounded-xl">
                            <p className="text-slate-400">Pending</p>
                            <h2 className="text-3xl font-bold text-purple-400 mt-2">{pendingTasks}</h2>
                        </div>
                        <div className="bg-slate-800 p-5 rounded-xl">
                            <p className="text-slate-400">Overdue</p>
                            <h2 className="text-3xl font-bold text-rose-400 mt-2">{overdueTasks}</h2>
                        </div>
                    </div>
                    <p className="mt-6 text-slate-400">Completion Rate: {completionRate}%</p>

                    <div className="mt-8 bg-slate-800 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">
                            Priority Distribution
                        </h2>
                        <div className="w-full h-72">
                            {totalTasks === 0 ? (
                                <p className="text-slate-400 text-center py-12">
                                    No tasks available to analyse yet.
                                </p>
                            ) : (
                                <div className="w-full h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie 
                                                data = {priorityData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={65}
                                                outerRadius={100}
                                                paddingAngle={4}
                                            >
                                                {priorityData.map((entry,index)=>(
                                                    <Cell
                                                        key={entry.name}
                                                        fill={COLORS[index]}    
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor:"#0f172a",
                                                    border: "1px solid #334155",
                                                    borderRadius: "10px",
                                                    color: "#fff"
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                            
                        </div>
                    </div>
                    <div className="mt-8 bg-slate-800 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold mb-2">Weekly Productivity</h2>
                        <p className="text-slate-400 text-sm mb-6">Tasks created over the last 7 days</p>
                        <div className="w-full h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={productivityData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#334155"
                                    />
                                    <XAxis
                                        dataKey="day"
                                        stroke="#94a3b8"
                                    />
                                    <YAxis
                                        stroke="#94a3b8"
                                    />
                                    <Tooltip/>
                                    <Bar
                                        dataKey="tasks"
                                        fill="#06b6d4"
                                        radius={[6,6,0,0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <section className="m-5">
                        <h2 className="text-white font-semibold mb-4">
                            Recent Activity
                        </h2>

                        {activities.length === 0 ? (
                            <p className="text-slate-400">No recent activity yet.</p>
                        ) : (
                            activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-start gap-4 rounded-xl border border-slate-700/60 bg-slate-800/50 p-4 mb-3 hover:bg-slate-800 transition"
                                >
                                    {/* Event indicator */}
                                    <div className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                                        activity.event === "Created" ? "bg-cyan-400" :
                                        activity.event === "Updated" ? "bg-blue-400" :
                                        activity.event === "Completed" ? "bg-emerald-400" :
                                        "bg-rose-400"
                                    }`}></div>

                                    {/* Activity details */}
                                    <div>
                                        <h3 className="text-white font-medium">
                                            {activity.task_name}
                                        </h3>

                                        <p className={`text-sm font-semibold ${
                                            activity.event === "Created" ? "text-cyan-400" :
                                            activity.event === "Updated" ? "text-blue-400" :
                                            activity.event === "Completed" ? "text-emerald-400" :
                                            "text-rose-400"
                                        }`}>
                                            {activity.event}
                                        </p>

                                        <p className="text-xs text-slate-400 mt-1">
                                            {getRelativeTime(activity.time_stamp)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </section>
                    
                </>


            )}
        </div>
    )
}