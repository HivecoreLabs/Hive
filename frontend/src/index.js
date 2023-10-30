import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app.jsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import { EmployeesProvider } from './contexts/EmployeesContext.js';
import { RolesProvider } from './contexts/RolesContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <React.StrictMode>
            <CssBaseline>
                <RolesProvider>
                <EmployeesProvider>
                    <App />
                </EmployeesProvider>
                </RolesProvider>
            </CssBaseline>
        </React.StrictMode>
    </HashRouter>
);