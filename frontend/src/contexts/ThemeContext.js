import { createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';
import React, { useState, useContext, createContext } from 'react';

const dayTheme = createTheme({
    shift: 'AM',
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
    shift: 'PM',
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
});

const now = new Date();
const currentHour = now.getHours();
const isDaytime = currentHour < 16; // 4 PM in 24-hour format
export const theme = isDaytime ? dayTheme : nightTheme;
// export const theme = nightTheme


// above is to be used by MUI's built-in ThemeProvider

// below is to be used by our app's custom ThemeContextProvider to manage state

// const ThemeContext = createContext();
// export const useThemeContext = () => useContext(ThemeContext);

// export const ThemeContextProvider = ({ children }) => {
//     const [theme, setTheme] = useState(isDaytime ? dayTheme : nightTheme);

//     const toggleTheme = () => {
//         debugger
//         setTheme((prevTheme) => (prevTheme === dayTheme ? nightTheme : dayTheme));
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// }