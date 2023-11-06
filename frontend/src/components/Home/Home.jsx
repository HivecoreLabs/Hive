import './Home.css';
import React, { useState, useContext, useRef } from 'react';
import { useTheme, Box, Typography, Button, Modal, TextField, FormControl, Input, InputLabel, FormHelperText } from '@mui/material';
import HiveRoundedIcon from '@mui/icons-material/HiveRounded';
import { css } from '@emotion/react'
import SignupModal from '../Modals/SignupModal.jsx';
import { useAuth } from '../../contexts/AuthenticationContext';
import { useError } from '../../contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    const newUserButtonRef = useRef(null);
    const theme = useTheme();
    const { isAuthenticated, user, login, logout } = useAuth();
    const { error, errorMessage, clearError, errorDispatch } = useError();

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

    const handleUsername = (e) => {
        if (error) errorDispatch(clearError());
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        if (error) errorDispatch(clearError());
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        navigate('/loading');
        e.preventDefault();
        if (error) errorDispatch(clearError());
        login(username, password);
    };

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
                            error={error}
                        />
                        <TextField
                            label="PIN"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={password}
                            required
                            onChange={handlePassword}
                            error={error}
                            inputProps={
                                { maxLength: 4 }
                            }
                        />
                    </FormControl>
                    <FormHelperText error>{errorMessage}</FormHelperText>
                    <Button
                        variant="contained"
                        sx={{ fontWeight: 'medium', color: 'primary.darker', marginTop: '15px' }}
                        type='submit'>
                        LOG IN
                    </Button>
                </form>
                <Button color="secondary" onClick={handleModalOpen}
                    sx={{
                        marginTop: '10px',
                        display: 'inline',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                    ref={newUserButtonRef}
                >
                    NEW USER?
                </Button>
            </Box>
            <SignupModal open={isModalOpen} closeModal={handleModalClose} />
        </div >
    );
};

export default Home;
