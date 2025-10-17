import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function onSubmit(e){
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
            const res = await axios.post(
                "https://reqres.in/api/login",
                { email, password },
                { headers: { "x-api-key": "reqres-free-v1" } }
            );
            const token = res.data?.token;
            if(token){
                localStorage.setItem("token", token);
            }
            navigate("/users", { replace: true });
        }catch(err){
            const msg = err?.response?.data?.error || err?.message || "Login failed";
            setError(msg);
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-xl shadow p-6">
                <h1 className="text-2xl font-semibold text-blue-900 mb-1">Welcome</h1>
                <p className="text-blue-800/70 mb-6">Please login to continue</p>

                {error && (
                    <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-800 px-3 py-2">{error}</div>
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
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full rounded-lg border border-blue-200 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-blue-900 placeholder-blue-900/40"
                            />
                            <button
                                type="button"
                                onClick={()=>setShowPassword(s=>!s)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute inset-y-0 right-2 my-auto h-8 px-2 rounded text-blue-800/80 hover:bg-blue-50"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium rounded-lg px-4 py-2 transition-colors"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-blue-900/70">
                    Don’t have an account? <a className="text-blue-700 font-medium hover:underline" href="#">Sign up</a>
                </div>
            </div>
        </div>
    )
}