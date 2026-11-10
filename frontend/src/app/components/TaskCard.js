"use client";
import { useState } from "react";
function TaskCard(props){
    const [isEditingDetails, setIsEditingDetails] = useState(false);
    const [editedTaskname, setEditedTaskname] = useState(props.taskName);
    const [editedDueDate, setEditedDueDate] = useState(props.dueDate);

    function handleEditdetails(){
        setEditedTaskname(props.taskName);
        setEditedDueDate(props.dueDate);
        setIsEditingDetails(true);
    }

    async function handleSaveDetails() {
        const saved = await props.onSaveTaskDetails(
            props.id,
            editedTaskname,
            editedDueDate
        );
        if (saved){
            setIsEditingDetails(false);
        }
    }

    function handleCancelDetails(){
        setEditedTaskname(props.taskName);
        setEditedDueDate(props.dueDate);
        setIsEditingDetails(false);
    }

    const priorityColors = {
        Urgent : "bg-red-500/15 text-red-400 border-red-500/30",
        High : "bg-orange-500/15 text-orange-400 border-orange-500/30",
        Medium : "bg-purple-500/15 text-purple-400 border-purple-500/30",
        Low : "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
    };

    return(
        <div className={`rounded-xl border border-slate-800 bg-slate-900 p-5 mb-4 transition-all ${props.isCompleted? "opacity-60" : "hover:border-cyan-800"}`}>
            {isEditingDetails?(
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editedTaskname}
                        onChange={(e)=>setEditedTaskname(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                        placeholder="task name"
                    />
                    <input
                        type="date"
                        value={editedDueDate}
                        onChange={(e)=>setEditedDueDate(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white"
                    />
                    <button
                        className="bg-cyan-600 text-white px-3 py-2 rounded-lg"
                        onClick={handleSaveDetails}
                    >
                        Save Details
                    </button>
                    <button
                        className="bg-slate-700 text-white px-3 py-2 rounded-lg ml-2"
                        onClick={handleCancelDetails}
                    >
                        Cancel
                    </button>
                </div>
            ):(
                <>
                    <h3 className="text-lg font-semibold text-white">{props.taskName}</h3>
                    {props.daysLeft>0
                        ? <p className="mt-2 text-slate-400">
                            {`Due in ${props.daysLeft} Days`}
                        </p>
                        : props.daysLeft === 0
                        ? <p className="mt-2 text-slate-400">Due Today!</p>
                        :<p>Overdue by ${Math.abs(props.daysLeft)} Days</p>
                    }
                </>
            )
            }
            {props.isEditingPriority ? (
                <>
                <select 
                    className="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-2"
                    value={props.newPriority}
                    onChange={(e)=>props.onPriorityChange(e.target.value)}
                    >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button className="bg-cyan-600 hover:bg-cyan-500 ml-2 text-white px-3 py-2 rounded-lg text-sm transition" onClick={() => props.onSavePriority(props.id)}>Save</button>
                <button className="bg-slate-700 hover:bg-slate-600 ml-2 text-white px-3 py-2 rounded-lg text-sm transition" onClick={props.onCancelPriority}>Cancel</button>
                </>
            ) : (
                <p className="mt-4 text-sm text-slate-300">Priority:
                    <span className={`ml-2 px-3 py-1 rounded-full border text-sm ${priorityColors[props.priority]}`}>
                        {props.priority}   
                    </span>
                </p>
                
            )}           
            <p className="mt-3 text-sm text-slate-400">Suggested Priority:<span className="text-cyan-400 font-medium ml-1"> {props.suggestedPriority}</span></p>
            <div className="flex flex-wrap gap-2 mt-4">
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition bg-slate-800 hover:bg-slate-700 text-white" onClick={()=>props.onEditPriority(props.id)}>Edit Priority</button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition bg-emerald-600 hover:bg-emerald-500 text-white" onClick={()=>props.onToggle(props.id)}>
                    {props.isCompleted? "Mark pending" : "Task completed"}</button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition bg-blue-600 hover:bg-blue-500 text-white" onClick={handleEditdetails}>Edit Task</button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition bg-rose-600 hover:bg-rose-500 text-white" onClick={()=>props.onDelete(props.id)}>Delete Task</button>
            </div>
            
        </div>
    );
}

export default TaskCard;