import { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { FaUser, FaCalendarCheck, FaUserTie } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
    const [stats, setStats] = useState([]);
    const [user, setUser] = useState([]);
    const [todayAttendance, setTodayAttendance] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [activeAdmin, setActiveAdmin] = useState([]);
    const URL = import.meta.env.VITE_BACKEND_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const getUser = () => {
        axios.get(`${URL}/user?KEY=${API_KEY}`)
        .then((res) => {
            setUser(res.data);
        })
        .catch((e) => {
            console.err(e?.response?.data?.message || "Failed to fetch user!");
        });
    }

    const getTodayAttendance = () => {
        axios.get(`${URL}/attendance/today?KEY=${API_KEY}`)
        .then((res) => {
            setTodayAttendance(res.data);
        })
        .catch((e) => {
            console.err(e?.response?.data?.message || "Failed to fetch today attendance!");
        });
    }

    const getAttStats = async () => {
        try {
            const res = await axios.get(`${URL}/att-stats/attendance-stats?KEY=${API_KEY}`);
            setStats(res.data);
        } catch (err) {
            console.error("Error fetching attendance stats:", err);
        }
    };

    const getActiveUsers = () => {
        axios.get(`${URL}/user/active-users?KEY=${API_KEY}`)
        .then((res) => {
            setActiveUsers(res.data);
        })
        .catch ((e) => {
            console.error(e?.response?.data?.message || "Failed to fetch active users!");
        })
    }

    const getActiveAdmin = () => {
        axios.get(`${URL}/user/active-admin?KEY=${API_KEY}`)
        .then((res) => {
            setActiveAdmin(res.data);
            console.log(res.data.map((i) => i.fullname))
        })
        .catch((e) => {
            console.error(e?.response?.data?.message || "Failed to fetch active admin!");
        });
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
            getAttStats();
            getUser();
            getTodayAttendance();
            getActiveUsers();
            getActiveAdmin();
        }
    
        const interval = setInterval(() => {
            getAttStats();
            getUser();
            getTodayAttendance();
            getActiveUsers();
            getActiveAdmin();
        }, 5000);
    
        return () => clearInterval(interval);
    }, []);    

    const chartData = {
        labels: stats.map(item => item.date.slice(0, 10)),
        datasets: [
            {
                label: "Total Attendance /day",
                data: stats.map(item => item.total_attendance),
                fill: true,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
            }
        ]
    };

    return (
        <>
            <div className="">
                <div className="flex justify-around">
                    <div className="bg-sky-500 rounded-lg p-4 w-60 flex items-center justify-between">
                        <div className="">
                            <p className="text-5xl font-medium text-slate-100">{user.length}</p>
                            <p className="text-slate-100 font-medium">Total User</p>
                        </div>
                        <FaUser className="text-slate-100 opacity-[.3] text-6xl"/>
                    </div>
                    <div className="bg-green-500 rounded-lg p-4 w-60 flex items-center justify-between">
                        <div className="">
                            <p className="text-5xl font-medium text-slate-100">{todayAttendance.length}</p>
                            <p className="text-slate-100 font-medium">Submitted Today</p>
                        </div>
                        <FaCalendarCheck className="text-slate-100 opacity-[.3] text-6xl"/>
                    </div>
                    <div className="bg-fuchsia-500 rounded-lg p-4 w-60 flex items-center justify-between">
                        <div className="">
                            <p className="text-5xl font-medium text-slate-100">{activeUsers.length}</p>
                            <p className="text-slate-100 font-medium">Active User</p>
                        </div>
                        <FaUser className="text-slate-100 opacity-[.3] text-6xl"/>
                    </div>
                    <div className="bg-yellow-500 rounded-lg p-4 w-60 flex items-center justify-between">
                        <div className="">
                            <p className="text-5xl font-medium text-slate-100">{activeAdmin.length}</p>
                            <p className="text-slate-100 font-medium">Active Admin</p>
                        </div>
                        <FaUserTie className="text-slate-100 opacity-[.3] text-6xl"/>
                    </div>
                </div>
                <div className="bg-white rounded-lg flex-1 w-full p-6">
                    <h2 className="text-2xl font-bold mb-4">Attendance Statistics</h2>
                    <div className="w-full h-[500px]">
                        <Line data={chartData} />
                    </div>
                </div>
            </div>
        </>
    );    
}