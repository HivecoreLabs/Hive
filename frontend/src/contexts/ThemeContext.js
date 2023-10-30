import { createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';

const dayTheme = createTheme({
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
});

const nightTheme = createTheme({
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

const theme = isDaytime ? dayTheme : nightTheme;

// const [darkMode, setDarkMode] = useState(false);

// const toggleTheme = () => {
//     setDarkMode((prevDarkMode) => !prevDarkMode);
// };

// const theme = darkMode ? nightTheme : dayTheme;

export { theme };
