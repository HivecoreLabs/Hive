// import { Box, Typography } from "@mui/material";
// import React from "react";
// import { useTheme } from "@mui/material";
// import WbSunnyIcon from '@mui/icons-material/WbSunny';

// function DashboardItem3() {

//     const theme = useTheme();
//     return (
//         <Box
//             sx={{
//                 // bgcolor: theme.palette.tertiary.main,
//                 // boxShadow: 1,
//                 p: 2,
//                 // minWidth: 300,
//             }}
//             display='flex'
//         >
//             <div>
//                 <Box sx={{ color: 'text.secondary' }}>It is currently the</Box>
//                 <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
//                     <Typography display='inline' variant="h3" color={theme.palette.primary.main}>{`${theme.shift}`}</Typography>
//                     <Typography ml={1} display='inline' variant="h5" color={theme.palette.primary.main}>shift</Typography>
//                 </Box>
//             </div>
//             <div >
//                 <WbSunnyIcon width='50' color="primary" />
//             </div>
//         </Box>)
// }

// export default DashboardItem3;

import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';

function DashboardItem3() {
    const theme = useTheme();

    const containerStyles = {
        display: 'flex',
        alignItems: 'center',
    };

    const textStyles = {
        color: theme.palette.primary.dark,
        fontSize: 34,
        fontWeight: 'medium',
        display: 'inline',
        alignItems: 'center',
        marginRight: '5px'
    };

    const sunIconStyles = {
        fontSize: 50,
        color: theme.palette.primary.main,
        screenLeft: 2
    };
    const moonIconStyles = {
        fontSize: 50,
        color: theme.palette.quaternary.main,
    };

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();

    return (
        <Box sx={containerStyles} p={3}>
            <div style={{ marginRight: '1.75em' }}>
                <Typography variant="body2" color="text.primary">
                    It is currently the
                </Typography>
                <Typography variant="h3" sx={textStyles}>
                    { theme.isAMShift ? 'AM' : 'PM' }
                </Typography>
                <Typography ml='7px' variant="h5" color="quaternary" component="span">
                    {`${hours}:${minutes}:${seconds}`}
                </Typography>
            </div>
            <div>
                {theme.isAMShift ? <WbSunnyIcon sx={sunIconStyles} /> : <ModeNightIcon sx={moonIconStyles} />}
            </div>
        </Box>
    );
}

export default DashboardItem3;
