import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    return(
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-3">
            <h1 className="text-2xl font-semibold text-blue-900 mb-2">Welcome</h1>
            <div className="flex gap-3">
                <button
                    onClick={()=>navigate('/register')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                    Register
                </button>
                <button
                    onClick={()=>navigate('/login')}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-900 px-4 py-2 rounded-md border border-blue-200"
                >
                    Login
                </button>
            </div>
        </div>
    )
}