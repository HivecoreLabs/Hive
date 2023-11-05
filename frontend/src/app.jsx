import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Employee from './components/Employees/index.jsx';
import SupportStaffPage from './components/SupportStaff';
import CheckoutsPage from './components/CheckoutsPage';
import CreateEmployeeForm from './components/EmployeeForm/CreateEmployee.jsx'
import EditEmployeeForm from './components/EmployeeForm/EditEmployee.jsx';
import ViewAllEmployees from './components/ViewAllPages/ViewAllEmployees.jsx';
import CreateRoleForm from './components/RoleForm/CreateRole.jsx';
import EditRoleForm from './components/RoleForm/EditRole.jsx';
import ViewAllRoles from './components/ViewAllPages/ViewAllRoles.jsx';
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
                <Route exact path="/checkouts" element={<CheckoutsPage />} />
                <Route path="/employees/new" element={<CreateEmployeeForm />} />
                <Route path="/employees/all" element={<ViewAllEmployees />} />
                <Route exact path="/employees/:id" element={<EditEmployeeForm />} />
                <Route path="/roles/new" element={<CreateRoleForm />}/>
                <Route exact path="/roles/all" element={<ViewAllRoles />} />
                <Route exact path="roles/:id" element={<EditRoleForm />} />
            </Routes>
        </>
    );
}
