import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Home from './components/home/Home';
import Header from './components/templates/Header';
import Admin from './components/admin/Admin';

const LoggedInCtx = createContext();
const IsAdminCtx = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const URL = import.meta.env.VITE_BACKEND_URL;
  
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${URL}/profile`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        
        if (response.data[0].role === "admin") {
          setIsAdmin(true);
        }
      } catch (e) {
        console.error("Error fetching profile:", e);
      }
    };
  
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      getProfile();
    }
  }, [isLoggedIn]);
  
  // useEffect(() => {
    // console.log(isAdmin);
  // }, [isAdmin]);  

  return (
    <LoggedInCtx.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <IsAdminCtx.Provider value={{ isAdmin, setIsAdmin }}>
        <Router>
          <MainLayout />
        </Router>
      </IsAdminCtx.Provider>
    </LoggedInCtx.Provider>
  );
}


function MainLayout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/admin' && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
      </Routes>
    </>
  );
}

export { LoggedInCtx, IsAdminCtx };
export default App;