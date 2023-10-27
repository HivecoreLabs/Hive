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

function SignupModal({ open, closeModal }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <TextField
                        // helperText="first name"
                        id="demo-helper-text-aligned"
                        label="first name"
                        sx={{ marginRight: '8px' }}
                        required
                    />
                    <TextField
                        // helperText="last name"
                        id="demo-helper-text-aligned-no-helper"
                        label="last name"
                        required
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
                        />
                    </FormControl>
                    <FormHelperText>Create a 4-digit PIN</FormHelperText>
                </div>
                <Button onClick={closeModal}>Close</Button>
            </Box>
        </Modal>
    )
};

export default SignupModal;

