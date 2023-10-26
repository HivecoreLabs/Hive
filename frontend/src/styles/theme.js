import { createTheme } from '@mui/material';

const dayTheme = createTheme({
  palette: {
    primary: {
      main: '#1E96FC', // light blue
    },
    secondary: {
      main: '#296EB4', // ocean blue
    },
    tertiary: {
      main: '#FDB833', // vibrant yellow
    },
    quaternary: {
      main: '#FFD07B', // warm, pale yellow
    },
    white: 'white',
    canvas: '#EDEDED', // off white
  },
});

const nightTheme = createTheme({
  palette: {
    // in order from darkest to brightest
    primary: {
      main: '#02010A',
    },
    secondary: {
      main: '#04052E',
    },
    tertiary: {
      main: '#140152',
    },
    quaternary: {
      main: '#22007C',
    },
    white: 'white',
    canvas: '#EDEDED', // off white
  },
});

export { dayTheme, nightTheme };
