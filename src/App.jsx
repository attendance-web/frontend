import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';

function App() {
  return (
    <>
      <Router basename='/'>  
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;