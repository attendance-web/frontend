import { useState, useEffect } from "react";
import axios from "axios";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("All");
    const [activityLog, setActivityLog] = useState([]);
    const URL = import.meta.env.VITE_BACKEND_URL;
    const API_KEY = import.meta.env.VITE_API_KEY

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
            axios.get(`${URL}/user?KEY=${API_KEY}`)
            .then((res) => {
                setUsers(res.data);
                console.log(res);
            })
            .catch((e) => {
                console.log("Error getting users data", e);
            })
    };

    const getActivityLog = async (userId) => {
        try {
            const response = await axios.get(`${URL}/admin/users/${userId}/activity-log`);
            setActivityLog(response.data);
        } catch (error) {
            console.error("Error fetching activity log:", error);
        }
    };

    const filteredUsers = users.filter(user => {
        const searchMatch = user.fullname.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
        const roleMatch = filterRole === "All" || user.role === filterRole;
        return searchMatch && roleMatch;
    });

    const handleRoleChange = (userId, role) => {
        axios.patch(`${URL}/user/${userId}/role`, { role }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(() => getUsers())
            .catch(err => console.error(err));
    };

    return (
        <div className="p-6 h-screen">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>

            {/* Search & Filter */}
            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded"
                />
                <select
                    value={filterRole}
                    onChange={e => setFilterRole(e.target.value)}
                    className="px-4 py-2 border rounded"
                >
                    <option value="All">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>

            <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 p-2">No</th>
                        <th className="border border-gray-300 p-2">User</th>
                        <th className="border border-gray-300 p-2">Role</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id} className="text-center">
                            <td className="border border-gray-300 p-2">{index + 1}</td>
                            <td className="border border-gray-300 p-2">{user.fullname}</td>
                            <td className="border border-gray-300 p-2">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    className="p-1 border rounded"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    onClick={() => getActivityLog(user.id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                >
                                    View Activity
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <h3 className="text-xl font-bold mb-2">User Activity Log</h3>
            {activityLog.length > 0 ? (
                <ul>
                    {activityLog.map((log, index) => (
                        <li key={index}>
                            <p>{log.timestamp}: {log.activity}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No activity logs available</p>
            )} */}
        </div>
    );
}