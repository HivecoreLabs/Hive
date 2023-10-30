import React, { useState } from 'react';
import { Modal, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../contexts/AuthenticationContext';

function SignupModal({ open, closeModal }) {
    const { signup } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignup = (e) => {
        e.preventDefault();
        signup(username, password);
        closeModal();
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <Modal open={open} onClose={closeModal}>
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
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="h6">Register</Typography>
                <form onSubmit={handleSignup}>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <TextField
                            // helperText="last name"
                            id="demo-helper-text-aligned-no-helper"
                            label="username"
                            required
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div >
                        <FormControl sx={{ m: 1, width: '12ch' }} variant="outlined" required >
                            <InputLabel htmlFor="outlined-adornment-password">PIN</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                onChange={handlePasswordChange}
                            />
                        </FormControl>
                        <FormHelperText>Create a 4-digit PIN</FormHelperText>
                    </div>
                    <Button type='submit'>Signup</Button>
                </form>
                <Button onClick={closeModal}>Close</Button>
            </Box>
        </Modal>
    )
};

export default SignupModal;

