
"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";   

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/token/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error("Invalid username or password");
            }

            sessionStorage.setItem("access", data.access);
            sessionStorage.setItem("refresh", data.refresh);

            router.replace("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl">

                <h1 className="text-3xl font-bold text-cyan-400 text-center">
                    DeadlineRadar
                </h1>

                <p className="text-slate-400 text-center mt-2 mb-8">
                    Let's make it happen!
                </p>

                <h2 className="text-2xl font-semibold text-white mb-6">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    <p className="mt-6 text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                        Register
                    </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}
