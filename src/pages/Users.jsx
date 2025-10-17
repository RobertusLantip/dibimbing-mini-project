import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://reqres.in/api/users";
const API_KEY = "reqres-free-v1"; // provided x-api-key
const DEFAULT_PER_PAGE = 10;

export default function Users(){
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [perPage] = useState(DEFAULT_PER_PAGE);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;
        async function fetchUsers(){
            setLoading(true);
            setError("");
            try{
                const res = await axios.get(API_BASE, {
                    params: { page, per_page: perPage },
                    headers: { "x-api-key": API_KEY },
                });
                const data = res.data;
                if(cancelled) return;
                setUsers(Array.isArray(data?.data) ? data.data : []);
                setTotalPages(Number(data?.total_pages || 1));
            }catch(err){
                if(cancelled) return;
                const msg = err?.response?.data?.message || err?.message || "Failed to load users";
                setError(msg);
            }finally{
                if(!cancelled) setLoading(false);
            }
        }
        fetchUsers();
        return () => { cancelled = true };
    }, [page, perPage]);

    function goToPage(next){
        if(next < 1 || next > totalPages) return;
        setPage(next);
    }

    return (
        <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-2xl font-semibold text-blue-900 mb-4">Users</h1>

            {error && (
                <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-800 px-3 py-2">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-28 rounded-lg bg-blue-100 animate-pulse" />
                    ))
                ) : (
                    users.map(u => (
                        <button
                            key={u.id}
                            onClick={()=>navigate(`/users/${u.id}`)}
                            className="text-left rounded-xl border border-blue-200 bg-white p-4 flex items-center gap-4 hover:bg-blue-50 transition-colors"
                        >
                            <img src={u.avatar} alt={`${u.first_name} ${u.last_name}`} className="w-14 h-14 rounded-full object-cover" />
                            <div>
                                <div className="font-medium text-blue-900">{u.first_name} {u.last_name}</div>
                                <div className="text-sm text-blue-900/70">{u.email}</div>
                            </div>
                        </button>
                    ))
                )}
            </div>

            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={()=>goToPage(page - 1)}
                    disabled={page <= 1 || loading}
                    className="px-3 py-2 rounded-md border border-blue-200 text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
                >
                    Previous
                </button>

                <div className="text-blue-900/80">
                    Page <span className="font-semibold text-blue-900">{page}</span> of <span className="font-semibold text-blue-900">{totalPages}</span>
                </div>

                <button
                    onClick={()=>goToPage(page + 1)}
                    disabled={page >= totalPages || loading}
                    className="px-3 py-2 rounded-md border border-blue-200 text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}


