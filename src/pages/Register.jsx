import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://reqres.in/api/register";
const API_KEY = "reqres-free-v1";

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    async function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try{
            const res = await axios.post(
                API_URL,
                { email, password },
                { headers: { "x-api-key": API_KEY } }
            );
            const token = res.data?.token;
            setSuccess(token ? `Registered successfully. Token: ${token}` : "Registered successfully.");
            navigate("/login", { replace: true });
        }catch(err){
            const msg = err?.response?.data?.error || err?.message || "Registration failed";
            setError(msg);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-xl shadow p-6">
                <h1 className="text-2xl font-semibold text-blue-900 mb-1">Create account</h1>
                <p className="text-blue-800/70 mb-4">Register with your email and password</p>

                {error && (
                    <div className="mb-3 rounded-md border border-red-200 bg-red-50 text-red-800 px-3 py-2">{error}</div>
                )}
                {success && (
                    <div className="mb-3 rounded-md border border-green-200 bg-green-50 text-green-800 px-3 py-2">{success}</div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            placeholder="name@example.com"
                            className="w-full rounded-lg border border-blue-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-blue-900 placeholder-blue-900/40"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full rounded-lg border border-blue-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-blue-900 placeholder-blue-900/40"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium rounded-lg px-4 py-2 transition-colors"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    )
}


