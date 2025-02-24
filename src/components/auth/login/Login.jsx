import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedInCtx } from '../../../App';
import emailIcon from '../../../assets/icon/email_icon.png';
import eyeOpenIcon from '../../../assets/icon/eye_open_icon.png'
import eyeCloseIcon from '../../../assets/icon/eye_close_icon.png'
import axios from 'axios';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggingIn, setIsLoggingIn]= useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { setIsLoggedIn } = useContext(LoggedInCtx);
    const URL = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleLogin = (e) => {
        setIsLoggingIn(true);
        e.preventDefault();
        axios.post(`${URL}/auth/login`, formData)
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            setIsLoggingIn(false);
            setIsLoggedIn(true);
            navigate('/');
        })
        .catch ((err) => {
            setError(err?.response?.data?.message ? err?.response?.data?.message : "Error during login");
            setIsLoggingIn(false);
        })
        .finally(() => {
            setIsLoggingIn(false);
        })
    }

    return (
        <>
            <div className="bg-indigo-950 min-h-screen flex justify-center items-center fixed inset-0">
                <form onSubmit={handleLogin} method="POST" action="" className="bg-slate-50 text-center p-4 rounded-lg shadow-md w-96">
                    <div className='mb-6'>
                        <h1 className="text-slate-800 text-2xl font-medium">Welcome</h1>
                        <p className="text-slate-800">Login to your account</p>
                    </div>
                    <div className="email-field relative items-center mb-6">
                        <input onChange={handleChange} placeholder='Email' className='w-full placeholder:font-semibold bg-slate-200 border-2 border-sky-500 focus:outline-none px-2 py-3 rounded-full' type="email" name="email"></input>
                        <img className="absolute right-3 w-5 top-4" src={emailIcon}/>
                    </div>
                    <div className="password-field relative items-center mb-4">
                        <input onChange={handleChange} placeholder='Password' className='w-full placeholder:font-semibold bg-slate-200 border-2 border-sky-500 focus:outline-none px-2 py-3 rounded-full' type={showPassword ? 'text' : 'password'} name="password"></input>
                        <img onClick={handleShowPassword} className="cursor-pointer absolute right-3 w-6 top-4" src={showPassword ? eyeCloseIcon : eyeOpenIcon}/>
                    </div>
                    {error && <p className='p-3 bg-red-200 text-red-500 rounded-full mb-4'>{error}</p>}
                    <button className='text-md bg-sky-500 text-slate-100 font-semibold w-full rounded-full p-3 mb-4' type='submit'>{isLoggingIn ? 'Logging in...': 'Login'}</button>
                    <p className='text-slate-800 font-semibold'>Not a member yet? <span onClick={() => navigate('/auth/register')} className='text-sky-500 font-bold cursor-pointer hover:underline'>Sign up</span></p>
                </form>
            </div>
        </>
    )
}