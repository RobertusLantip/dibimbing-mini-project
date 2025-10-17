import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://reqres.in/api/users";
const API_KEY = "reqres-free-v1";

export default function UserDetail(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;
        async function fetchUser(){
            setLoading(true);
            setError("");
            try{
                const res = await axios.get(`${API_BASE}/${id}`, {
                    headers: { "x-api-key": API_KEY }
                });
                if(cancelled) return;
                setUser(res.data?.data ?? null);
            }catch(err){
                if(cancelled) return;
                const msg = err?.response?.data?.message || err?.message || "Failed to load user";
                setError(msg);
            }finally{
                if(!cancelled) setLoading(false);
            }
        }
        if(id) fetchUser();
        return () => { cancelled = true };
    }, [id]);

    return (
        <div className="max-w-xl mx-auto px-4 mt-5">
            {loading && (
                <div className="rounded-xl border border-blue-200 bg-white p-6 animate-pulse h-40" />
            )}
            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 text-red-800 px-3 py-2 mb-4">{error}</div>
            )}
            {user && (
                <div className="rounded-xl border border-blue-200 bg-white p-6 flex gap-4 items-center">
                    <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-24 h-24 rounded-full object-cover" />
                    <div>
                        <div className="text-xl font-semibold text-blue-900">{user.first_name} {user.last_name}</div>
                        <div className="text-blue-900/80">{user.email}</div>
                        <div className="text-blue-900/70 text-sm mt-1">ID: {user.id}</div>
                    </div>
                </div>
            )}
        </div>
    );
}


