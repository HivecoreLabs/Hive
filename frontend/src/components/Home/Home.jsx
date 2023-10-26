import './Home.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@emotion/react';


export default function Home() {

    const theme = useTheme();
    const [pin, setPin] = useState('');

    const handlePin = (e) => {
        setPin(e.target.value);
    };

    return (
        <>
            <div className='home'>
                <h2>Enter Your PIN</h2>
                <input
                    type="password"
                    value={pin}
                    onChange={handlePin}
                    placeholder="Enter PIN"
                    maxLength="4"
                />
            </div>
        </>
    );
};