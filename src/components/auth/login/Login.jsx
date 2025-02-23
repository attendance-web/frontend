import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailIcon from '../../../assets/icon/email_icon.png';
import eyeOpenIcon from '../../../assets/icon/eye_open_icon.png'
import eyeCloseIcon from '../../../assets/icon/eye_close_icon.png'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className="bg-indigo-950 min-h-screen flex justify-center items-center fixed inset-0">
                <form method="POST" action="" className="bg-slate-50 text-center p-4 rounded-lg shadow-md w-96">
                    <div className='mb-6'>
                        <h1 className="text-slate-800 text-2xl font-medium">Welcome</h1>
                        <p className="text-slate-800">Login to your account</p>
                    </div>
                    <div className="email-field relative items-center mb-6">
                        <input placeholder='Email' className='w-full placeholder:font-semibold bg-slate-200 border-2 border-sky-500 focus:outline-none px-2 py-3 rounded-full' type="email" name="email"></input>
                        <img className="absolute right-3 w-5 top-4" src={emailIcon}/>
                    </div>
                    <div className="password-field relative items-center mb-4">
                        <input placeholder='Password' className='w-full placeholder:font-semibold bg-slate-200 border-2 border-sky-500 focus:outline-none px-2 py-3 rounded-full' type={showPassword ? 'text' : 'password'} name="password"></input>
                        <img onClick={handleShowPassword} className="cursor-pointer absolute right-3 w-6 top-4" src={showPassword ? eyeCloseIcon : eyeOpenIcon}/>
                    </div>
                    <button className='text-md bg-sky-500 text-slate-100 font-semibold w-full rounded-full p-3 mb-4' type='submit'>Login</button>
                    <p className='text-slate-800 font-semibold'>Not a member yet? <span onClick={() => navigate('/auth/register')} className='text-sky-500 font-bold cursor-pointer hover:underline'>Sign up</span></p>
                </form>
            </div>
        </>
    )
}