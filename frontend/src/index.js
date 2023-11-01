import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app.jsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import { AuthenticationContextProvider } from './contexts/AuthenticationContext.js';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './contexts/ThemeContext';
import { ErrorContextProvider } from './contexts/ErrorContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <React.StrictMode>
            {/* <CssBaseline> */}
            <ThemeProvider theme={theme}>
                <ErrorContextProvider>
                    <AuthenticationContextProvider>
                        <App />
                    </AuthenticationContextProvider>
                </ErrorContextProvider>
            </ThemeProvider>
            {/* </CssBaseline> */}
        </React.StrictMode>
    </HashRouter>
);