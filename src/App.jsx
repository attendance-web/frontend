import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Home from './components/home/Home';
import Header from './components/templates/Header';
import AttendanceStats from './components/admin/AttendanceStats';

const LoggedInCtx = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <LoggedInCtx.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <MainLayout />
      </Router>
    </LoggedInCtx.Provider>
  );
}

// 🔥 Pisahkan `useLocation()` ke komponen khusus
function MainLayout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/admin' && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<AttendanceStats />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
      </Routes>
    </>
  );
}

export { LoggedInCtx };
export default App;