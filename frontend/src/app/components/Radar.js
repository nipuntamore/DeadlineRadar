"use client" 
import { useState} from "react";
import dynamic from 'next/dynamic';


export default function Radar({tasks, calculateDaysLeft}){
    const [selectedTask,setSelectedTask] = useState(null);

    function getRadarRadius(daysLeft){
        if (daysLeft <= 0){
            return 10;
        }
        else if (daysLeft<=3){
            return 40;
        }
        else if (daysLeft<=7){
            return 80;
        }
        else if (daysLeft<=14){
            return 120;
        }
        else{
            return 160;
        }
    }
    function getRadarCoordinates(daysLeft, taskId){
        const angle = ((taskId * 137.508) % 360) * Math.PI / 180;
        const radius = getRadarRadius(daysLeft);
        
        const x = Number((200 + radius * Math.cos(angle)).toFixed(2));
        const y = Number((200 + radius * Math.sin(angle)).toFixed(2));

        return {x,y};
        
    }

    function getPriorityColor(priority){
        if (priority === "Urgent") {
            return "red";
        }
        else if (priority === "High") {
            return "orange";
        }
        else if (priority === "Medium") {
            return "purple";
        }
        else {
            return "green";
        }
    }

    return(
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">

            <div className="flex justify-center" >
                <svg 
                    viewBox="0 0 400 400"
                    className="w-full max-w-md"
                >
                    <circle
                        cx="200"
                        cy="200"
                        r="160"
                        fill="none"
                        stroke="#0891b2"
                        strokeWidth="2"
                    />
                    <circle
                        cx="200"
                        cy="200"
                        r="120"
                        fill="none"
                        stroke="#0891b2"
                        strokeWidth="2"
                    />
                    <circle
                        cx="200"
                        cy="200"
                        r="80"
                        fill="none"
                        stroke="#0891b2"
                        strokeWidth="2"
                    />
                    <circle
                        cx="200"
                        cy="200"
                        r="40"
                        fill="none"
                        stroke="#0891b2"
                        strokeWidth="2"
                    />
                    <circle
                        cx="200"
                        cy="200"
                        r="10"
                        fill="none"
                        stroke="#0891b2"
                        strokeWidth="2"
                    />
                    <circle
                        cx="200"
                        cy="200"
                        r="5"
                        fill="cyan"
                    />
                    <line
                        x1="200"
                        y1="0"
                        x2="200"
                        y2="400"
                        stroke="#0891b2"
                        strokeWidth="1"
                        opacity="0.5"
                    />
                    <line
                        x1="0"
                        y1="200"
                        x2="400"
                        y2="200"
                        stroke="#0891b2"
                        strokeWidth="1"
                        opacity="0.5"
                    />
                    {tasks.map((task)=>{
                        const daysLeft = calculateDaysLeft(task.dueDate);
                        const coordinates = getRadarCoordinates(daysLeft,task.id);
                        return(
                            <circle
                                key={task.id}
                                cx={coordinates.x}
                                cy={coordinates.y}
                                r="7"
                                fill={getPriorityColor(task.priority)}
                                onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                                
                            >
                                <title>{`${task.taskName} - ${daysLeft} days left`}</title>
                            </circle>
                        );
                    })}
                </svg>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {selectedTask && (
                    <div className="rounded-xl bg-slate-800 border border-cyan-500 px-5 py-5 w-full max-w-sm mt-5 mx-auto text-white md:col-start-1">
                        <h3 className="text-lg font-semibold text-cyan-400 mb-3">Task: {selectedTask.taskName}</h3>
                        <p className="text-sm mb-2">Due date: {selectedTask.dueDate}</p>
                        <p  className="text-sm mb-2">Days left: {calculateDaysLeft(selectedTask.dueDate)}</p>
                        <p className="text-sm">Priority: {selectedTask.priority}</p>
                    </div>
                )}
                <div className="rounded-xl bg-slate-800 border border-cyan-500 px-5 py-3 w-full max-w-sm mt-5 mx-auto text-white md:col-start-2">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">Legend</h3>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Urgent</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span>High</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Low</span>
                    </div>
                    <h3 className="text-lg font-semibold text-cyan-400 ">Deadline Zones</h3>
                    <p className="text-sm">Centre — Due today / Overdue</p>
                    <p className="text-sm">First ring — 1–3 days</p>
                    <p className="text-sm">Second ring — 4–7 days</p>
                    <p className="text-sm">Third ring — 8–14 days</p>
                    <p className="text-sm">Outer ring — 15+ days</p>
                    
                </div>
            </div>
        </div>
    )
}