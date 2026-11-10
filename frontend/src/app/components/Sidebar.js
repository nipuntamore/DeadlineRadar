"use client"

import { useState } from "react";
export default function Sidebar(){
    const [isOpen,setIsOpen] = useState(false);
    return(
        <>
        <button className={`fixed top-4 ${isOpen ? "left-56" : "left-4"} z-50 p-3 text-white bg-slate-800 rounded-lg md:hidden`}
        
            onClick={() => setIsOpen(!isOpen)}>
                {isOpen? "✕" : "☰"}
        </button>
        <aside className={`${isOpen ? "flex" : "hidden"} md:flex fixed md:static inset-y-0 left-0 z-40 w-64 shrink-0 min-h-screen bg-slate-950 text-white p-6 flex-col`}>            
             
            <div className="text-xl font-bold text-cyan-400 mb-8">DeadlineRadar</div>
            <ul className="mt-8 space-y-3">
                <li className="px-4 py-3 rounded-lg hover:bg-slate-800 cursor-pointer transition">Dashboard</li>
                <li className="px-4 py-3 rounded-lg hover:bg-slate-800 cursor-pointer transition">My Tasks</li>
                <li className="px-4 py-3 rounded-lg hover:bg-slate-800 cursor-pointer transition">Calendar</li>
                <li className="px-4 py-3 rounded-lg hover:bg-slate-800 cursor-pointer transition">Analytics</li>
                <li className="px-4 py-3 rounded-lg hover:bg-slate-800 cursor-pointer transition">Settings</li>
            </ul>


            <div className="mt-auto text-sm text-slate-500">
                Made by Nipun Tamore
            </div>
        </aside>
        </>
    )
}