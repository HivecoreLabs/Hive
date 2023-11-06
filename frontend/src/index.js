import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import App from './app.jsx';
import './index.css';
import { AuthenticationContextProvider } from './contexts/AuthenticationContext.js';
import { EmployeesProvider } from './contexts/EmployeesContext.js';
import { RolesProvider } from './contexts/RolesContext.js';
import { theme } from './contexts/ThemeContext';
import { ErrorContextProvider } from './contexts/ErrorContext.js';
import { SupportStaffContextProvider } from './contexts/SupportStaffContext.js';
import CheckoutsContextProvider from './contexts/CheckoutsContext.js';
import DateContextProvider from './contexts/DateContext.js';
// import ThemeContextProvider from './contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <React.StrictMode>
            {/* <CssBaseline> */}
            <ThemeProvider theme={theme}>
                {/* <ThemeContextProvider> */}
                <ErrorContextProvider>
                    <RolesProvider>
                        <EmployeesProvider>
                            <SupportStaffContextProvider>
                                <CheckoutsContextProvider>
                                    <AuthenticationContextProvider>
                                        <DateContextProvider>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <App />
                                            </LocalizationProvider>
                                        </DateContextProvider>
                                    </AuthenticationContextProvider>
                                </CheckoutsContextProvider>
                            </SupportStaffContextProvider>
                        </EmployeesProvider>
                    </RolesProvider>
                </ErrorContextProvider>
                {/* </ThemeContextProvider> */}
            </ThemeProvider>
            {/* </CssBaseline> */}
        </React.StrictMode>
    </HashRouter>
);