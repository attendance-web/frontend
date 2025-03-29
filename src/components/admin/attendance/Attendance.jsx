import axios from "axios";
import { useEffect, useState } from "react";

export default function Attendance() {
    const [attStats, setAttStats] = useState([]);
    const [totalAttended, setTotalAttended] = useState(0);
    const [attendanceList, setAttendanceList] = useState([]);
    const [lastUpdated, setLastUpdated] = useState("");
    const URL = import.meta.env.VITE_BACKEND_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    // Toggle Open/Close Attendance
    const toggleAttendance = () => {
        axios.patch(`${URL}/att-stats/toggle`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            alert(res.data.message);
            getAttendanceStatus();
            getAttendanceList();
        })
        .catch ((e) => {
            console.error("Error toggle attendance status", e);
        });
    }

    // Get Attendance Status
    const getAttendanceStatus = () => {
        axios.get(`${URL}/att-stats?KEY=${API_KEY}`)
        .then((res) => {
            setAttStats(res.data[0].stats);
            setLastUpdated(res.data[0].datetime);
        })
        .catch((e) => {
            console.error("Error fetching attendance status", e);
        });
    }

    // Get Attendance List
    const getAttendanceList = () => {
        axios.get(`${URL}/attendance/today?KEY=${API_KEY}`)
        .then((res) => {
            setAttendanceList(res.data);
            setTotalAttended(res.data.length); // Hitung jumlah yang sudah absen
        })
        .catch((e) => {
            console.error("Error fetching attendance list", e);
        });
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getAttendanceStatus();
            getAttendanceList();
        }
        
        const interval = setInterval(() => {
            getAttendanceStatus();
            getAttendanceList();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div className="h-screen">
            <div className="text-3xl font-medium text-slate-700">Attendance Status: {attStats === 1 ? 'Open' : 'Closed'}</div>
            <p className="text-gray-500 text-sm">Last updated: {new Date(lastUpdated).toLocaleString()}</p>
            <button className={`${attStats === 1 ? 'bg-red-500 hover:bg-red-700' : 'bg-sky-500 hover:bg-sky-700'} text-white font-medium py-2 px-4 rounded mt-3`} onClick={toggleAttendance}>{attStats === 1 ? 'Close Attendance' : 'Open Attendance'}</button>

            <div className="mt-5">
                <p className="text-lg font-semibold">Total attendance today: {totalAttended}</p>
            </div>

            <div className="mt-3">
                <h3 className="text-lg font-semibold">List attendance today:</h3>
                <table className="border-collapse w-full mt-2">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceList.length > 0 ? (
                            attendanceList.map((user, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{user.fullname}</td>
                                    <td className="border p-2">
                                        {new Date(user.datetime).toLocaleTimeString("en-US", { timeStyle: "short" })}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="border p-2 text-center" colSpan="2">No attendance yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}
