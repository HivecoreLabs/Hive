import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app.jsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import { AuthenticationProvider } from './contexts/AuthenticationContext.js';
import { ThemeProvider } from '@mui/material/styles';
import { EmployeesProvider } from './contexts/EmployeesContext.js';
import { RolesProvider } from './contexts/RolesContext.js';
import { theme } from './contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <React.StrictMode>
            {/* <CssBaseline> */}
            <ThemeProvider theme={theme}>
                <RolesProvider>
                <EmployeesProvider>
                <AuthenticationProvider>
                    <App />
                </AuthenticationProvider>
                </EmployeesProvider>
                </RolesProvider>
            </ThemeProvider>
            {/* </CssBaseline> */}
        </React.StrictMode>
    </HashRouter>
);