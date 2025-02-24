import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoggedInCtx } from "../../App";
import axios from "axios";

export default function Home() {
    const [fullname, setFullname] = useState("User");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isLoggedIn } = useContext(LoggedInCtx);
    const navigate = useNavigate();
    const URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        handleGetProfile();
    }, []);

    const handleGetProfile = () => {
        axios.get(`${URL}/profile`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response) => {
            console.log(response);
            setFullname(response.data[0].fullname);
        })
        .catch ((err) => {
            console.error(err || "Error get profile");
        });
    }

    const handleAttendance = () => {
        setIsSubmitting(true);

        axios.post(`${URL}/attendance`, { attendance: 1 }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then((res) => {
            alert("Attendance submitted!");
            setIsSubmitting(false);
        })
        .catch((err) => {
            alert("Failed to submit attendance!");
            console.error(err);
            setIsSubmitting(false);
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/auth/login");
    }

    return (
        <>
        <div className="header absolute top-0 right-0 left-0 bg-indigo-600 justify-between flex p-4">
            <p className="text-slate-100 text-2xl font-bold">Att.Id</p>
            <button onClick={isLoggedIn ? handleLogout : () => navigate('/auth/login')} className="text-slate-100 text-md font-medium rounded-md hover:bg-indigo-400 transition-all duration-200 p-2 cursor-pointer bg-indigo-500">{isLoggedIn ? 'Sign out' : 'Sign in'}</button>
        </div>
            <div className="min-h-screen bg-indigo-950 flex flex-col justify-center items-center text-white">
                <h1 className="text-4xl font-bold mb-2 animate-fadeIn">Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-500">{fullname}</span></h1>
                <p className="text-gray-300 mb-6">Click the button below to mark your attendance</p>
                <button
                    onClick={handleAttendance} 
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-600 transition-all rounded-full font-semibold text-lg shadow-lg disabled:bg-gray-600"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Mark Attendance"}
                </button>
            </div>
        </>
    );
}
