import './Home.css';
import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import HiveRoundedIcon from '@mui/icons-material/HiveRounded';
import { useTheme } from '@mui/material';
import { css } from '@emotion/react'
import SignupModal from '../Modals/SignupModal.jsx';
import CreateEmployeeForm from '../EmployeeForm/CreateEmployee.jsx';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pin, setPin] = useState('');
    const theme = useTheme();

    const style = css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '10px'
    })

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handlePinChange = (e) => {
        setPin(e.target.value);
    };

    const handleSignIn = () => {
        // Add logic for handling the PIN/password and sign-in
        console.log('Sign-in with PIN:', pin);
    };


    return (
        <div className='home-container'>
            <Box sx={style}>

                <HiveRoundedIcon sx={{ fontSize: '70px', marginBottom: '10px', color: 'primary.dark' }} />

                <TextField
                    label="Enter PIN"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={pin}
                    onChange={handlePinChange}
                    required='true'
                />

                <Button variant="contained" sx={{ fontWeight: 'medium', color: 'primary.darker', marginTop: '10px' }} onClick={handleSignIn}>
                    Sign In
                </Button>

                <Button color="secondary" onClick={handleModalOpen} sx={{
                    marginTop: '10px',
                    display: 'inline',
                    '&:hover': {
                        textDecoration: 'underline'
                    }
                }}>
                    NEW USER?
                </Button>
            </Box>
            <SignupModal open={isModalOpen} closeModal={handleModalClose} />
            {/* <CreateEmployeeForm /> */}
        </div >
    );
};

export default Home;
