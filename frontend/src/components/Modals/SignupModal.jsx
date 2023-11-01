import React, { useEffect, useState } from 'react';
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
    const [passwordsDontMatchError, setPasswordsDontMatchError] = useState('');

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword1 = () => setShowPassword1(prevState => !prevState);
    const handleClickShowPassword2 = () => setShowPassword2(prevState => !prevState);

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordsDontMatchError('PINs do not match')
            return;
        }
        const response = signup(username, password);
        console.log(response);
        console.log(response.error);
        closeModal();
    };

    const handleUsername = (e) => setUsername(e.target.value);

    const handlePassword = (e) => {
        setPassword(e.target.value.replace(/\D/g, ""));
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value.replace(/\D/g, ""));
        setPasswordsDontMatchError('');
    }

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setPasswordsDontMatchError('');
        setShowPassword1(false);
        setShowPassword2(false);
    };

    useEffect(() => {
        resetForm();
    }, [open])

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
                    flexDirection: 'column',
                    borderRadius: '12px'
                }}
            >
                <Typography variant="h6">Register</Typography>
                <form onSubmit={handleSignup} className='signup-form'>
                    <TextField
                        label="username"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        required
                        sx={{ mb: '12px', width: '19ch' }}
                        onChange={handleUsername}
                    />
                    <FormControl sx={{ mb: '12px', width: '19ch' }} required variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">PIN</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword1 ? 'text' : 'password'}
                            value={password}
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword1}
                                        edge="end"
                                    >
                                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="PIN"
                            error={!!passwordsDontMatchError}
                            inputProps={{
                                maxLength: 4,
                            }}
                            onChange={handlePassword}
                            placeholder='Create a 4-digit PIN'
                        />
                    </FormControl>
                    {/* <FormHelperText>Create a 4-digit PIN</FormHelperText> */}
                    <FormControl sx={{ width: '19ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Confirm PIN</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword2 ? 'text' : 'password'}
                            value={confirmPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword2}
                                        edge="end"
                                    >
                                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm PIN"
                            error={!!passwordsDontMatchError}
                            inputProps={{
                                maxLength: 4,
                            }}
                            onChange={handleConfirmPassword}
                        />
                    </FormControl>
                    <FormHelperText>{passwordsDontMatchError}</FormHelperText>
                    <Button
                        variant="contained"
                        sx={{ fontWeight: 'medium', color: 'primary.darker', marginTop: '18px', marginBottom: '10px' }}
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

