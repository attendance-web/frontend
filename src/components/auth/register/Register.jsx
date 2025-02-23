import { useEffect, useState } from 'react';
import { Meta, useNavigate } from 'react-router-dom';
import axios from 'axios';
import paperIcon from '../../../assets/icon/paper_icon.png';
import emailIcon from '../../../assets/icon/email_icon.png';
import eyeOpenIcon from '../../../assets/icon/eye_open_icon.png';
import eyeCloseIcon from '../../../assets/icon/eye_close_icon.png';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        birthday: "",
    });
    const URL = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    const handleRegister = (e) => {
        setIsRegistering(true);
        e.preventDefault();
        axios.post(`${URL}/auth/register`, formData)
        .then(() => {
            setIsRegistering(false)
            navigate('/auth/login');
            setSuccess(true);
            alert("asdwa")
        })
        .catch((err) => {
            setIsRegistering(false)
            setMessage(err.response.data.message);
            console.log(err);
            setSuccess(false);
        });
    }

    return (
        <>
            <div className="bg-indigo-950 justify-center items-center flex inset-0 absolute">
                <form onSubmit={handleRegister} method="POST" action="" className="w-full max-w-md bg-slate-50 text-center p-4 rounded-lg shadow-md">
                    <div className='mb-6'>
                        <h1 className="text-slate-800 text-2xl font-medium">Create an account</h1>
                        <p className="text-slate-800">Register to get started</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="fullname-field relative items-center mb-6">
                            <input onChange={handleChange} placeholder="Fullname" className="w-full placeholder:font-semibold bg-slate-200 border-2 border-sky-500 focus:outline-none px-2 py-3 rounded-full" type="text" name="fullname"></input>
                            <img className='z-10 bg-slate-200 rounded-lg absolute right-2 w-8 top-3' src={paperIcon} />
                        </div>
                        <div className="email-field relative items-center mb-6">
                            <input onChange={handleChange} placeholder='Email' className='w-full placeholder:font-semibold bg-slate-200 border-2 border-sky-500 focus:outline-none px-2 py-3 rounded-full' type="email" name="email"></input>
                            <img className="z-10 bg-slate-200 absolute right-2 w-5 top-4" src={emailIcon} />
                        </div>
                    </div>
                    <div className="password-field relative items-center mb-4">
                        <input onChange={handleChange} placeholder='Password' className='w-full placeholder:font-semibold bg-slate-200 border-2 border-sky-500 focus:outline-none px-2 py-3 rounded-full' type={showPassword ? 'text' : 'password'} name="password"></input>
                        <img onClick={handleShowPassword} className="z-10 bg-slate-200 rounded-lg cursor-pointer absolute right-2 w-6 top-4" src={showPassword ? eyeCloseIcon : eyeOpenIcon} />
                    </div>
                    <div className="birthday-field mb-6">
                        <p className='font-semibold text-sky-500 text-start mb-2'>BirthDay</p>
                        <input onChange={handleChange} type="date" name='birthday' className="w-full placeholder:font-semibold bg-slate-200 border-2 border-sky-500 focus:outline-none px-2 py-3 rounded-full"></input>
                    </div>
                    {message && <p className={`p-3 mb-4 rounded-full ${success ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'}`}>{message}</p>}
                    <button className='text-md bg-sky-500 text-slate-100 font-semibold w-full rounded-full p-3 mb-4' type='submit'>{isRegistering ? 'Registering...' : 'Register'}</button>
                    <p className='text-slate-800 font-semibold'>Already have an account? <span onClick={() => navigate('/auth/login')} className='text-sky-500 font-bold cursor-pointer hover:underline'>Sign in</span></p>
                </form>
            </div>
        </>
    )
}