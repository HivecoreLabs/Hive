import { createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';
import React, { useState, useContext, createContext } from 'react';

const dayTheme = createTheme({
    isAMShift: true,
    palette: {
        // in order from brightest to darkest
        primary: {
            main: '#FFD07B',
        },
        secondary: {
            main: '#FDB833',
        },
        tertiary: {
            main: '#1E96FC',
        },
        quaternary: {
            main: '#296EB4',
        },
        white: 'white',
        canvas: '#EDEDED', // off white
    },
    navHover: '#00000008'
});

const nightTheme = createTheme({
    isAMShift: false,
    palette: {
        // in order from darkest to brightest
        primary: {
            main: indigo[200],
        },
        secondary: {
            main: indigo[400],
        },
        tertiary: {
            main: '#140152',
        },
        quaternary: {
            main: '#02010A',
        },
        white: 'white',
        canvas: '#EDEDED', // off white
    },
    navHover: '#00000008'

});

const now = new Date();
const currentHour = now.getHours();
const currentMinutes = now.getMinutes();
const isAMShift = currentHour < 15 || (currentHour === 15 && currentMinutes < 30);
// AM Shift is before 3:30 PM, PM Shift is after 3:30 PM
export const theme = isAMShift ? dayTheme : nightTheme;

// export const theme = nightTheme


// above is to be used by MUI's built-in ThemeProvider

// below is to be used by our app's custom ThemeContextProvider to manage state

// const ThemeContext = createContext();
// export const useThemeContext = () => useContext(ThemeContext);

// export const ThemeContextProvider = ({ children }) => {
//     const [theme, setTheme] = useState(isDaytime ? dayTheme : nightTheme);

//     const toggleTheme = () => {
//         setTheme((prevTheme) => (prevTheme === dayTheme ? nightTheme : dayTheme));
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// }