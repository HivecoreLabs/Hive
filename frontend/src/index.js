import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app.jsx';
import './index.css';
import { CssBaseline } from '@mui/material';
import { AuthenticationProvider } from './contexts/AuthenticationContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <React.StrictMode>
            <CssBaseline>
                <AuthenticationProvider>
                    <App />
                </AuthenticationProvider>
            </CssBaseline>
        </React.StrictMode>
    </HashRouter>
);