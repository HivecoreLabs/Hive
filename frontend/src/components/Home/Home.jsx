import './Home.css';
import React, { useState } from 'react';
import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import HiveRoundedIcon from '@mui/icons-material/HiveRounded';
import { useTheme } from '@mui/material';
import { css } from '@emotion/react'

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

            {/* Modal Dialog for New User Registration */}
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    {/* Add your registration form or content here */}
                    <Typography variant="h6">New User Registration</Typography>
                    {/* Registration form fields go here */}
                    <Button onClick={handleModalClose}>Close</Button>
                </Box>
            </Modal>
        </div >
    );
};

export default Home;
