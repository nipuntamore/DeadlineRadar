"use client"

import { useState, useEffect } from "react";

export default function Settings(){
    const [displayName, setDisplayName] = useState ("User");
    const [defaultPriority, setDefaultPriority] = useState("Medium")
    const [saveMessage, setSaveMessage] = useState("");
    const [prioritySaveMessage, setPrioritySaveMessage] = useState("");

    useEffect(() => {
        const savedName = localStorage.getItem("displayName");
        const savedPriority = localStorage.getItem("defaultPriority");

        if (savedName) {
            setDisplayName(savedName);
        }

        if (savedPriority) {
            setDefaultPriority(savedPriority);
        }
    }, []);

    

   

    return(
        <><div className="space-y-6 ">
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-slate-400">Customize your DeadlineRadar Experience</p>
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-6 space-y-4 m-5">
            <h2 className="text-xl font-semibold text-white">Profile</h2>
            <label className="mb-2 block text-sm text-slate-300">Display Name</label>
            <input
                type="text"
                value={displayName}
                onChange={(e)=>{setDisplayName(e.target.value), setPrioritySaveMessage("");}}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
            <button
                onClick={() => {
                    localStorage.setItem("displayName", displayName.trim());
                    setSaveMessage("Display name saved successfully!");
                }}
                className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 m-5"
            >
                Save Changes
            </button>
            {saveMessage && (
                <p className="text-sm text-emerald-400">
                    ✓ {saveMessage}
                </p>
            )}
        </div>
        <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-6 space-y-4 m-5">
                <div>
                    <h2 className="text-xl font-semibold text-white">Preferences</h2>
                    <p className="text-sm text-slate-400">Choose your default task priority.</p>
                </div>
            
            <select
                value={defaultPriority}
                onChange={(e) => {setDefaultPriority(e.target.value);  setSaveMessage("")}}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
            >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <button
                onClick={() => {
                    localStorage.setItem("defaultPriority", defaultPriority);
                    setPrioritySaveMessage("Default priority saved successfully!");
                }}
                className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
            >
                Save Preference
            </button>
            {prioritySaveMessage && (
                <p className="text-sm text-emerald-400">
                    ✓ {prioritySaveMessage}
                </p>
            )}
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-6 space-y-4 m-5">
            <h2 className="text-xl font-semibold text-white">
                About DeadlineRadar
            </h2>

            <div className="space-y-3 text-sm">
                <div className="grid col-2 mt-5">
                    <span className="text-slate-400">Application</span>
                    <span className="text-white font-medium mt-2">DeadlineRadar</span>
                </div>
                <div className="border-t border-slate-700 pt-3">
                    <p className="text-slate-400">Technology Stack</p>
                    <p className="mt-2 text-cyan-400">
                        Next.js · React · Django · SQLite
                    </p>
                </div>
                <div className="grid col-2">
                    <span className="text-slate-400">Developer</span>
                    <span className="text-white mt-2">Nipun Tamore</span>
                </div>
                <div className="grid col-2">
                    <span className="text-slate-400">Contact</span>
                    <span className="text-white mt-2">tamorenipun@gmail.com</span>
                </div>
                <div className="grid col-2">
                    <a href="https://www.linkedin.com/in/nipun-tamore-21ba5b308" className="text-cyan">
                    linkedIn
                    </a>
                </div>
            </div>


            <p className="text-center text-slate-500 italic pt-3">
                "Let's make it happen."
            </p>
        </div>

        </>
    )
}