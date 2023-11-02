import React, { useState } from 'react';
import { Grid, Typography, Paper, TextField, Button, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import './SupportStaffForm.css';
import SupportStaffList from './SupportStaffList.jsx';

function SupportStaffForm() {

    const [employee, setEmployee] = useState('');
    const [role, setRole] = useState('');
    const [timeIn, setTimeIn] = useState('')
    const [timeOut, setTimeOut] = useState('')
    const [isDoubleShift, setIsDoubleShift] = useState(false);
    const [savedMembers, setSavedMembers] = useState([]);

    const handleEmployee = (e) => {
        setEmployee(e.target.value);
    }
    const handleRole = (e) => {
        setRole(e.target.value);
    }
    const handleTimeIn = (e) => {
        setTimeIn(e.target.value);
    }
    const handleTimeOut = (e) => {
        setTimeOut(e.target.value);
    }
    const handleIsDoubleShift = (e) => {
        setIsDoubleShift(prevState => !prevState);
    }

    const roles = ['Role 1', 'Role 2', 'Role 3'];
    const employees = ['Employee 1', 'Employee 2', 'Employee 3'];

    const fetchAllEmployees = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMember = {
            employee,
            role,
            timeIn,
            timeOut,
            isDoubleShift,
        };
        setSavedMembers([...savedMembers, newMember])

        setEmployee('');
        setRole('');
        setTimeIn('');
        setTimeOut('');
        setIsDoubleShift(false);
    }

    return (
        <div>
            <div className='support-staff-form-container'>
                <Typography variant="h5" align="center" mb='20px'>
                    Active Support Staff
                </Typography>
                {[...Array(1)].map((_, index) => (
                    <Paper elevation={2} style={{ padding: '10px', marginBottom: '10px', width: '50%' }} key={index}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Employee"
                                        variant="outlined"
                                        value={employee}
                                        onChange={handleEmployee}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Employee</em>
                                        </MenuItem>
                                        {employees.map((employee) => (
                                            <MenuItem key={employee} value={employee}>
                                                {employee}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Current Role"
                                        variant="outlined"
                                        value={role}
                                        onChange={handleRole}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Current Role</em>
                                        </MenuItem>
                                        {roles.map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        fullWidth
                                        id="time-in"
                                        type='time'
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        label="Time In"
                                        value={timeIn}
                                        onChange={handleTimeIn}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <TextField
                                        fullWidth
                                        id="time-out"
                                        type='time'
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        label="Time Out"
                                        value={timeOut}
                                        onChange={handleTimeOut}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" value={isDoubleShift} onChange={handleIsDoubleShift} />}
                                        label="Is Double Shift?"
                                    />
                                </Grid>
                            </Grid>
                            <Button type='submit'>Submit</Button>
                        </form>
                    </Paper>
                ))}
            </div>
            <SupportStaffList savedMembers={savedMembers} />
        </div>
    );
}

export default SupportStaffForm;
