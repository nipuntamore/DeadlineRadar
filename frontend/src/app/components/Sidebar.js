"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar(){
    const [isOpen,setIsOpen] = useState(false);
    const pathname = usePathname();
    const navItems = [
        {name: "Dashboard", path:"/"},
        {name:"My Tasks", path:"/tasks"},
        {name:"Calendar", path:"/calendar"},
        {name:"Analytics", path:"/analytics"},
        {name:"Settings", path:"/settings"}
    ];

    return(
        <>
        <button className={`fixed top-4 ${isOpen ? "left-56" : "left-4"} z-50 p-3 text-white bg-slate-800 rounded-lg md:hidden`}
        
            onClick={() => setIsOpen(!isOpen)}>
                {isOpen? "✕" : "☰"}
        </button>
        <aside className={`${isOpen ? "flex" : "hidden"} md:flex fixed md:static inset-y-0 left-0 z-40 w-64 shrink-0 min-h-screen bg-slate-950 text-white p-6 flex-col`}>            
             
            <div className="text-xl font-bold text-cyan-400 mb-8">DeadlineRadar</div>
            <ul className="mt-8 space-y-3">
                {navItems.map((item)=>(<li key={item.path}>
                    <Link
                        href={item.path}
                        onClick={()=>setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg transition ${pathname === item.path? "bg-slate-800 text-cyan-400":"hover:bg-slate-800 text-slate-300"}`}
                    >{item.name}</Link>
                </li>))}
            </ul>

            <div className="mt-auto text-sm text-slate-500">
                Made by Nipun Tamore
            </div>
        </aside>
        </>
    )
}