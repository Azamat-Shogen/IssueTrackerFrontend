import React from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isAuth } from './utils/auth';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Dashboard from './components/dashboard/Dashboard';


const  App: React.FC = () => {

const isLoggedIn:boolean = false // isAuth();

  return (
    <div className="App">
        <Router>
            <Navbar />
            <Routes>
                {/* public routes */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Registration />} />
                 {/* private routes */}
                 <Route path='/dashboard' 
                 element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                 {/* Catch all routes */}
                <Route path='*' element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
