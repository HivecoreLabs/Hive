import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import EmployeeForm from './components/EmployeeForm/index.jsx';
import { useAuth } from './contexts/AuthenticationContext';

export default function App() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated && <NavBar />}
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}