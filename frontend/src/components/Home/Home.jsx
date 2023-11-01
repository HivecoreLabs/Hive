import './Home.css';
import React, { useState, useContext } from 'react';
import { useTheme, Box, Typography, Button, Modal, TextField, FormControl, Input, InputLabel, FormHelperText } from '@mui/material';
import HiveRoundedIcon from '@mui/icons-material/HiveRounded';
import { css } from '@emotion/react'
import SignupModal from '../Modals/SignupModal.jsx';
import { useAuth } from '../../contexts/AuthenticationContext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    const theme = useTheme();
    const { isAuthenticated, user, login, logout } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const style = css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '10px',
    })

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
    }

    return (
        <div className='home-container'>
            <Box sx={style}>
                <HiveRoundedIcon sx={{ fontSize: '70px', marginBottom: '10px', color: 'primary.dark' }} />
                <form onSubmit={handleLogin} className='login-form'>
                    <FormControl >
                        <TextField
                            label="username"
                            type="text"
                            variant="outlined"
                            margin="normal"
                            value={username}
                            required
                            style={{ marginBottom: '-5px' }}
                            onChange={handleUsername}
                        />
                        <TextField
                            label="PIN"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={password}
                            required
                            onChange={handlePassword}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{ fontWeight: 'medium', color: 'primary.darker', marginTop: '15px' }}
                        type='submit'>
                        LOG IN
                    </Button>
                </form>
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
