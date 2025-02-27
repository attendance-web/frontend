import { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
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

export default function AttendanceStats() {
    const [stats, setStats] = useState([]);
    const URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        axios.get(`${URL}/att-stats/attendance-stats`)
            .then(res => {
                setStats(res.data)

                console.log(res);
            })
            .catch(err => console.error(err));

    }, []);

    const chartData = {
        labels: stats.map(item => item.date),
        datasets: [
            {
                label: "Total Attendance",
                data: stats.map(item => item.total_attendance),
                fill: true,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
            }
        ]
    };

    return (
        <>
            <div className="flex h-svh">
                <Sidebar />
                <div className="bg-white rounded-lg flex-1 w-full p-6">
                    <h2 className="text-2xl font-bold mb-4">Attendance Statistics</h2>
                    <div className="w-full h-[400px]">
                        <Line data={chartData} />
                    </div>
                </div>
            </div>
        </>
    );    
}