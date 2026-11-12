
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/register/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = Object.values(data)
                    .flat()
                    .join(" ");

                throw new Error(errorMessage || "Registration failed");
            }

            router.replace("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-8">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl">

                <h1 className="text-3xl font-bold text-cyan-400 text-center">
                    DeadlineRadar
                </h1>

                <p className="text-slate-400 text-center mt-2 mb-8">
                    Let's make it happen!
                </p>

                <h2 className="text-2xl font-semibold text-white mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-5">

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            maxLength={150}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="Choose a username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="Enter your email"
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
                            placeholder="Create a password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-500"
                            placeholder="Confirm your password"
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
                        {isLoading ? "Creating account..." : "Register"}
                    </button>

                </form>

                <p className="text-slate-400 text-sm text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}
