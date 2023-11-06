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
    navHover: '#00000008',
    AM: '#FFD07B',
    PM: '#9fa8da',
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
    navHover: '#00000008',
    AM: '#FFD07B',
    PM: '#9fa8da',
});

const now = new Date();
const currentHour = now.getHours();
const currentMinutes = now.getMinutes();
const isPMShift = (currentHour >= 16 || currentHour < 3);
// PM Shift is from 4:00 PM to 3:00 AM the next day
export const theme = isPMShift ? nightTheme : dayTheme;
// export const theme = dayTheme;

// export const theme = nightTheme

// above is to be used by MUI's built-in ThemeProvider

// below is to be used by our app's custom ThemeContextProvider to manage state

// const ThemeContext = createContext();
// export const useThemeContext = () => useContext(ThemeContext);

// const ThemeContextProvider = ({ children }) => {
//     const [themeToggle, setThemeToggle] = useState(theme);

//     const toggleTheme = () => {
//         setThemeToggle((prevTheme) => (prevTheme === dayTheme ? nightTheme : dayTheme));
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export default ThemeContextProvider;