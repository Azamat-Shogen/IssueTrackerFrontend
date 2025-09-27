import React from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Dashboard from './components/dashboard/Dashboard';
import { useAuth } from './context/AuthContext';
import Footer from './components/footer/Footer';
import IssueDeails from './components/issue-details/IssueDeails';


const  App: React.FC = () => {

const auth = useAuth();

console.log('auth is: ', auth?.isAuth)

const isLoggedIn:boolean = auth?.isAuth ?? false;

  return (
    <div className="App d-flex flex-column min-vh-100">
        <Router>
            <Navbar />
            {/* Main content grows to fill available space */}
            <div className="flex-grow-1">
            <Routes>
                {/* public routes */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Registration />} />
                
                {/* private routes */}
                <Route
                path='/dashboard'
                element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route path='/issues/:issueId' element={<IssueDeails />}/>
                {/* Catch-all */}
                <Route path='*' element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
            </Routes>
            </div>
        </Router>
        <Footer />
    </div>
  );
}

export default App;
