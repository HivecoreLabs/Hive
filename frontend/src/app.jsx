import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
// import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import SupportStaffPage from './components/SupportStaff';
import CheckoutsPage from './components/CheckoutsPage';
import ReportsPage from './components/ReportsPage';
import Loading from './components/LoadingScreen/Loading.jsx';
import Logout from './components/LoadingScreen/Logout.jsx';
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
    const location = useLocation();

    const [mode, setMode] = useState(theme);
    const toggleTheme = () => {
        setMode(prevState => !prevState);
    }

    const isReportsRoute = location.pathname === '/loading';

    return (
        <>
            {isAuthenticated && !isReportsRoute && <NavBar toggleTheme={toggleTheme} />}
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/dashboard" element={<LandingPage />} />
                <Route exact path="/support" element={<SupportStaffPage />} />
                <Route exact path="/checkouts" element={<CheckoutsPage />} />
                <Route exact path="/reports" element={<ReportsPage />} />
                <Route exact path="/loading" element={<Loading />} />
                <Route exact path="/logout" element={<Logout />} />
                <Route path="/employees/new" element={<CreateEmployeeForm />} />
                <Route path="/employees/all" element={<ViewAllEmployees />} />
                <Route exact path="/employees/:id" element={<EditEmployeeForm />} />
                <Route path="/roles/new" element={<CreateRoleForm />} />
                <Route exact path="/roles/all" element={<ViewAllRoles />} />
                <Route exact path="roles/:id" element={<EditRoleForm />} />
            </Routes>
        </>
    );
}
