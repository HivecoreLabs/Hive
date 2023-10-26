import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { dayTheme, nightTheme } from './styles/theme';

export default function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };

    const theme = darkMode ? nightTheme : dayTheme;

    return (
        <ThemeProvider theme={theme}>
            <NavBar toggleTheme={toggleTheme} />
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </ThemeProvider>
    );
}