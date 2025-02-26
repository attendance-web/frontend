import { useContext, useEffect, useState } from "react";
import { LoggedInCtx } from "../../App";
import axios from "axios";

export default function Home() {
    const [fullname, setFullname] = useState("User");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isLoggedIn } = useContext(LoggedInCtx);
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
        .then((response) => {
            alert(response.data.message);
            setIsSubmitting(false);
        })
        .catch((err) => {
            alert("Failed to submit attendance!");
            console.error(err);
            setIsSubmitting(false);
        });
    };

    const attOpnened = true;

    return (
        <>
            <div className="min-h-screen text-center bg-indigo-950 flex flex-col justify-center items-center text-white">
                <h1 className="text-4xl font-bold mb-2 animate-fadeIn">Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-500">{fullname}</span></h1>
                <p className="text-gray-300 mb-6">{isLoggedIn ? 'Click the button below to mark your attendance' : 'Login to mark your attendance'}</p>
                <button
                    onClick={handleAttendance} 
                    className={`${isLoggedIn && attOpnened ? '' : 'cursor-not-allowed hover:animate-shake'} px-6 py-3 bg-sky-500 hover:bg-sky-600 transition-all rounded-full font-semibold text-lg shadow-lg disabled:bg-gray-600`}
                    disabled={isSubmitting || !isLoggedIn || !attOpnened}
                >
                    {isSubmitting ? "Submitting..." : "Mark Attendance"}
                </button>
            </div>
        </>
    );
}
