import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaChartBar, FaCog, FaSignOutAlt, FaHome, FaCalendarCheck, FaFile } from "react-icons/fa";
import { FaFileAlt } from 'react-icons/fa';
import { IsAdminCtx } from "../../App";
import axios from "axios";
import AttendanceStats from "./Dashboard/Dashboard";
import UserManagement from "./user_stats/UserManagement";
import Attendance from "./attendance/Attendance";
import Logs from "./logs/Logs";

export default function Admin() {
    const [isOpen, setIsOpen] = useState(true);
    const [activeComponent, setActiveComponent] = useState("dashboard");
    const [countdown, setCountdown] = useState(5);
    const { isAdmin } = useContext(IsAdminCtx);
    const URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

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
     
    useEffect(() => {
            if (!isAdmin) {
                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev === 1) {
                            clearInterval(timer);
                            navigate('/');
                        }
                        return prev - 1;
                    });
                }, 1000);
                return () => clearInterval(timer);
            }
    }, [isAdmin, navigate]);

    return (
        isAdmin ? (
            <>
                <div className="flex">
                    <div className={`bg-indigo-950 text-white p-5 ${isOpen ? "w-52" : "w-20"} transition-all duration-300`}>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-xl mb-4">
                            {isOpen ? "🔽" : "➡️"}
                        </button>

                        <ul>
                            <li className={`mb-4 flex transition-all duration-200 ${activeComponent == "dashboard" ? 'bg-sky-500' : 'hover:bg-indigo-900'} p-1 rounded-md items-center cursor-pointer`} onClick={() => setActiveComponent("dashboard")}>
                                <FaHome className="mr-3" />
                                {isOpen && <p>Dashboard</p>}
                            </li>
                            <li className={`mb-4 flex transition-all duration-200 ${activeComponent == "userManagement" ? 'bg-sky-500' : 'hover:bg-indigo-900'} p-1 rounded-md items-center cursor-pointer`} onClick={() => setActiveComponent("userManagement")}>
                                <FaUser className="mr-3" />
                                {isOpen && <p>User Management</p>}
                            </li>
                            <li className={`mb-4 flex transition-all duration-200 ${activeComponent == "attendance" ? 'bg-sky-500' : 'hover:bg-indigo-900'} p-1 rounded-md items-center cursor-pointer`} onClick={() => setActiveComponent("attendance")}>
                                <FaCalendarCheck className="mr-3" />
                                {isOpen && <p>Attendance</p>}
                            </li>
                            <li className={`mb-4 flex transition-all duration-200 ${activeComponent == "statistics" ? 'bg-sky-500' : 'hover:bg-indigo-900'} p-1 rounded-md items-center cursor-pointer`} onClick={() => setActiveComponent("statistics")}>
                                <FaChartBar className="mr-3" />
                                {isOpen && <p>Statistics</p>}
                            </li>
                            <li className={`mb-4 flex transition-all duration-200 ${activeComponent == "logs" ? 'bg-sky-500' : 'hover:bg-indigo-900'} p-1 rounded-md items-center cursor-pointer`} onClick={() => setActiveComponent("logs")}>
                                <FaFileAlt className="mr-3" />
                                {isOpen && <p>Logs</p>}
                            </li>
                            <li className={`mb-4 flex transition-all duration-200 ${activeComponent == "settings" ? 'bg-sky-500' : 'hover:bg-indigo-900'} p-1 rounded-md items-center cursor-pointer`} onClick={() => setActiveComponent("settings")}>
                                <FaCog className="mr-3" />
                                {isOpen && <p>Settings</p>}
                            </li>
                            <li className="mt-10 flex transition-all duration-200 hover:bg-red-500 hover:text-slate-100 p-1 rounded-md cursor-pointer items-center text-red-400">
                                <FaSignOutAlt className="mr-3" />
                                {isOpen && <button onClick={handleLogout}>Logout</button>}
                            </li>
                        </ul>
                    </div>

                    <div className="flex-1 p-6">
                        {activeComponent === "dashboard" && <AttendanceStats />}
                        {activeComponent === "userManagement" && <UserManagement />}
                        {activeComponent === "attendance" && <Attendance />}
                        {activeComponent === "logs" && <Logs />}
                    </div>
                </div>
            </>
        ) : (
            <>
                <p className="absolute text-red-500 font-medium text-xl flex justify-center items-center inset-0">
                    You {"don't"} have permission to access this page. Redirecting in... {countdown} secs
                </p>
            </>
        )
    );
}