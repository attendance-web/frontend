import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInCtx } from "../../App";

export default function Header() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(LoggedInCtx);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/auth/login");
        navigate(0)
    }

    return (
        <>
            <div className="header absolute top-0 right-0 left-0 bg-indigo-600 justify-between items-center flex p-4">
                <p onClick={() => navigate('/')} className="cursor-pointer text-slate-100 text-2xl font-bold">Att.Id</p>
                <button onClick={isLoggedIn ? handleLogout : () => navigate('/auth/login')} className="text-slate-100 text-md font-medium rounded-md hover:bg-indigo-400 transition-all duration-200 p-2 cursor-pointer bg-indigo-500">{isLoggedIn ? 'Sign out' : 'Sign in'}</button>
            </div>
        </>
    )
}