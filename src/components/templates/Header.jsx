import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInCtx, IsAdminCtx } from "../../App";
import axios from "axios";

export default function Header() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(LoggedInCtx);
    const { isAdmin } = useContext(IsAdminCtx);
    const URL = import.meta.env.VITE_BACKEND_URL;

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            
            const response = await axios.post(`${URL}/auth/logout`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
    
            console.log(response);
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
    
            navigate("/auth/login", { replace: true });
            response.status === 200 && navigate(0);
        } catch (err) {
            console.error("Logout failed:", err?.response?.data?.message || err.message);
        }
    };
    
    return (
        <>
            <div className="header absolute top-0 right-0 left-0 bg-indigo-600 justify-between items-center flex p-4">
                <p onClick={() => navigate('/')} className="cursor-pointer text-slate-100 text-2xl font-bold">Att.Id</p>
                <div className="flex gap-2">
                    <button onClick={isLoggedIn ? handleLogout : () => navigate('/auth/login')} className="text-slate-100 text-md font-medium rounded-md hover:bg-indigo-400 transition-all duration-200 p-2 cursor-pointer bg-indigo-500">{isLoggedIn ? 'Sign out' : 'Sign in'}</button>
                    {isAdmin && <button onClick={() => navigate('/admin')} className="text-indigo-600 rounded-md font-medium p-2 bg-slate-100">Admin</button>}
                </div>
            </div>
        </>
    )
}