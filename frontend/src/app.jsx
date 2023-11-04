import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Employee from './components/Employees/index.jsx';
import CreateEmployeeForm from './components/EmployeeForm/CreateEmployee.jsx'
import ViewAllEmployees from './components/ViewAllEmployees/index.jsx';
import SupportStaffPage from './components/SupportStaff/index.js'
import { useAuth } from './contexts/AuthenticationContext';
import { theme } from './contexts/ThemeContext';

export default function App() {
    const { isAuthenticated } = useAuth();
    const [mode, setMode] = useState(theme);
    const toggleTheme = () => {
        setMode(prevState => !prevState);
    }
    return (
        <>
            {isAuthenticated && <NavBar toggleTheme={toggleTheme} />}
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/employees" element={<Employee />} />
                <Route exact path="/support" element={<SupportStaffPage />} />
                <Route exact path="/checkouts" element={<SupportStaffPage />} />
                <Route path="/employees/new" element={<CreateEmployeeForm />} />
                <Route path="/employees/all" element={<ViewAllEmployees />} />
            </Routes>
        </>
    );
}
