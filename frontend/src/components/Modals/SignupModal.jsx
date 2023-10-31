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
import './SignupModal.css';

function SignupModal({ open, closeModal }) {
    const { signup } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordsMatchError, setPasswordsMatchError] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const passwordsMatchError = passwordsEqual(); // Check if passwords match
        if (passwordsMatchError) {
            return;
        }
        signup(username, password);
        closeModal();
    };

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(true);
    }

    const passwordsEqual = () => {
        if (password !== confirmPassword) {
            setPasswordsMatchError(true);
            setPasswordsMatch(false);
            return true; // Indicate that passwords don't match
        } else {
            setPasswordsMatchError(false);
            return false; // Indicate that passwords match
        }
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
                <form onSubmit={handleSignup} className='signup-form'>
                    {/* <TextField
                        // helperText="last name"
                        id="demo-helper-text-aligned-no-helper"
                        label="username"
                        required
                        onChange={handleUsernameChange}
                    />
                    <FormControl variant="outlined" required >
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
                    <Button variant='contained' type='submit'>Signup</Button> */}
                    <TextField
                        label="username"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        required={true}
                        style={{ marginBottom: '-5px' }}
                        onChange={handleUsername}
                    />
                    <TextField
                        label="PIN"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        required={true}
                        onChange={handlePassword}
                        placeholder='create a 4-digit PIN'
                        style={{ marginBottom: '-5px' }}
                    />
                    <TextField
                        label="Confirm PIN"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={confirmPassword}
                        required={true}
                        onChange={handleConfirmPassword}
                        error={passwordsMatchError}
                        helperText={passwordsMatch ? "" : "PINs do not match"}
                    />
                    <Button
                        variant="contained"
                        sx={{ fontWeight: 'medium', color: 'primary.darker', marginTop: '15px', marginBottom: '10px' }}
                        type='submit'
                    >
                        SIGN UP
                    </Button>
                </form>
                <div>
                    <Button onClick={closeModal}>Close</Button>
                </div>
            </Box>
        </Modal>
    )
};

export default SignupModal;

