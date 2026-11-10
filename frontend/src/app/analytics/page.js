"use client";

import { useState, useEffect } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
}from "recharts";


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
                </>


            )}
        </div>
    )
}