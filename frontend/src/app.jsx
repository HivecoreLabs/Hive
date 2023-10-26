import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { dayTheme, nightTheme } from './styles/theme';

export default function App() {
    // const [darkMode, setDarkMode] = useState(false);

    // const toggleTheme = () => {
    //     setDarkMode((prevDarkMode) => !prevDarkMode);
    // };

    // const theme = darkMode ? nightTheme : dayTheme;

    const now = new Date();
    const currentHour = now.getHours();
    const isDaytime = currentHour < 16; // 4 PM in 24-hour format

    const theme = isDaytime ? dayTheme : nightTheme;

    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </ThemeProvider>
    );
}