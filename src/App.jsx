import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Home from './components/home/Home';

const LoggedInCtx = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <LoggedInCtx.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router basename='/'>  
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
        </Routes>
      </Router>
    </LoggedInCtx.Provider>
  )
}

export { LoggedInCtx };
export default App;