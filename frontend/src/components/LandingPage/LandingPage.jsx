import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import './LandingPage.css';

function LandingPage() {

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
        <div className="landing-page-container">
            <h1>
                Welcome!
            </h1>

            <div className='landing-page-time'>
                <div>
                    <Typography variant="body2" color="text.primary">
                        It is currently
                    </Typography>
                    <Typography variant="h3" sx={textStyles}>
                        { theme.isAMShift ? 'AM' : 'PM' }
                    </Typography>
                    <Typography ml='7px' variant="h5" color="quaternary" component="span">
                        {`${hours}:${minutes}:${seconds}`}
                    </Typography>
                </div>

                { theme.isAMShift ? (
                    <>
                        <WbSunnyIcon className='sun-icon' sx={sunIconStyles} />
                    </>
                ) : (
                    <>
                        <ModeNightIcon className='moon-icon' sx={moonIconStyles} />
                    </>
                ) }
            </div>


        </div>
    )

}

export default LandingPage;