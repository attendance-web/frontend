import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaChartBar, FaCog, FaSignOutAlt, FaHome, FaCalendarCheck } from "react-icons/fa";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/auth/login");
        navigate(0)
    }

    return (
        <div className={`bg-gray-900 text-white p-5 ${isOpen ? "w-64" : "w-20"} transition-all duration-300`}>
            <button onClick={() => setIsOpen(!isOpen)} className="text-xl mb-4">
                {isOpen ? "🔽" : "➡️"}
            </button>

            <ul>
                <li className="mb-4 flex items-center">
                    <FaHome className="mr-3" />
                    {isOpen && <Link to="/admin">Dashboard</Link>}
                </li>
                <li className="mb-4 flex items-center">
                    <FaUser className="mr-3" />
                    {isOpen && <Link to="/admin/users">Users Statistics</Link>}
                </li>
                <li className="mb-4 flex items-center">
                    <FaCalendarCheck className="mr-3" />
                    {isOpen && <Link to="/admin/attendance">Attendance</Link>}
                </li>
                <li className="mb-4 flex items-center">
                    <FaChartBar className="mr-3" />
                    {isOpen && <Link to="/admin/reports">Laporan</Link>}
                </li>
                <li className="mb-4 flex items-center">
                    <FaCog className="mr-3" />
                    {isOpen && <Link to="/admin/settings">Settings</Link>}
                </li>
                <li className="mt-10 flex items-center text-red-400">
                    <FaSignOutAlt className="mr-3" />
                    {isOpen && <button onClick={handleLogout}>Logout</button>}
                </li>
            </ul>
        </div>
    );
}