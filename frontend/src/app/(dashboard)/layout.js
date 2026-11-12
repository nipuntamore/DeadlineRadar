
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("access");

        if (!accessToken) {
            router.replace("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-cyan-400">
                Checking authentication...
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-900">
            <Sidebar />
            {children}
        </div>
    );
}
