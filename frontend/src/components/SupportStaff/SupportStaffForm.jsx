import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, TextField, Button, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import './SupportStaffForm.css';
import SupportStaffList from './SupportStaffList.jsx';
import { useEmployees } from '../../contexts/EmployeesContext';
import { useRoles } from '../../contexts/RolesContext';
import { useTheme } from '@mui/material';

function SupportStaffForm() {
    const theme = useTheme();
    const { employees, readAllEmployees } = useEmployees();
    const { roles, readAllRoles } = useRoles();

    const [employee, setEmployee] = useState('');
    const [employeeSelected, setEmployeeSelected] = useState(false);
    const [role, setRole] = useState('');
    const [date, setDate] = useState(dayjs());
    const [timeIn, setTimeIn] = useState(null);
    const [timeOut, setTimeOut] = useState(null);
    console.log(employees);

    // we need this when formatting times in the request body 
    const convertTimeFromFrontend = (frontendTime) => {
        const date = newDate(frontendTime);
        const dateString = date.toISOString();
        return dateString;
    }

    const handleEmployee = (e) => {
        setEmployee(e.target.value);
        setEmployeeSelected(true);
    }

    const handleRole = (e) => {
        setRole(e.target.value);
    }
    const handleDate = (value) => {
        setDate(value)
    }
    const handleTimeIn = (value) => {
        setTimeIn(value);
    }
    const handleTimeOut = (value) => {
        setTimeOut(value);
    }

    const employeesList = employees.length > 0 ? (
        employees.map((employee, idx) => (
            <MenuItem key={idx} value={employee}>
                {employee.first_name} {employee.last_name}
            </MenuItem>
        ))
    ) : null;

    // const transformRolesForSelect = (roles) => {
    //     return roles.map((role) => ({
    //         id: role.id,
    //         role: role.role,
    //     }));
    // }
    // const rolesList = roles.length > 0 ? (
    //     transformRolesForSelect(roles).map((role, idx) => (
    //         <MenuItem key={idx} value={role}>
    //             {role.role}
    //         </MenuItem>
    //     ))
    // ) : null;

    // const specificRolesList = 

    const rolesList = roles.length > 0 ? (
        roles.map((role, idx) => (
            <MenuItem key={idx} value={role}>
                {role.role}
            </MenuItem>
        ))
    ) : null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newClockIn = {
            // we don't have employee_id yet
            employee_id: employee.id,
            active_role_id: role.id,
            date: date.format('YYYY-MM-DD'),
            time_in: timeIn ? convertTimeFromFrontend(timeIn) : null,
            time_out: timeOut ? convertTimeFromFrontend(timeOut) : null,
            is_am: theme.isAMShift
        };

        setEmployee('');
        setRole('');
        setDate(dayjs());
        setTimeIn(null);
        setTimeOut(null);
    }

    const handleResetFields = () => {
        setEmployee('');
        setRole('');
        setTimeIn(null);
        setTimeOut(null);
        setDate(dayjs());
    }

    useEffect(() => {
        readAllEmployees();
        readAllRoles();
    }, [])

    return (
        <div>
            <div className='support-staff-form-container'>
                {/* <Typography variant="h5" align="center" mb='20px'>
                    Add Support Staff Clock-In
                </Typography> */}
                {[...Array(1)].map((_, index) => (
                    <Paper elevation={2} style={{ padding: '20px', marginBottom: '10px', width: '600px', borderRadius: '8px' }} key={index}>
                        <Typography variant="h5" align="center" mb='20px'>
                            Add Support Staff Clock-In
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Employee"
                                        variant="outlined"
                                        value={employee}
                                        onChange={handleEmployee}
                                    >
                                        <div></div>
                                        {employeesList}
                                    </TextField>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Current Role"
                                        variant="outlined"
                                        value={role}
                                        onChange={handleRole}
                                    >
                                        <div></div>
                                        {rolesList}
                                    </TextField>
                                </Grid>
                                <Grid item sm={6}>
                                    <DatePicker
                                        sx={{ width: '100%' }}
                                        label="Date"
                                        onChange={handleDate}
                                        value={dayjs(date)}
                                    />
                                </Grid>
                                <Grid item sm={3}>
                                    {/* <TextField
                                        fullWidth
                                        id="time-in"
                                        type='time'
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        label="Time In"
                                        value={timeIn}
                                        onChange={handleTimeIn}
                                    /> */}
                                    <TimePicker
                                        label="Time In"
                                        value={timeIn}
                                        onChange={handleTimeIn}
                                    />
                                </Grid>
                                <Grid item sm={3}>
                                    {/* <TextField
                                        fullWidth
                                        id="time-out"
                                        type='time'
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        label="Time Out"
                                        value={timeOut}
                                        onChange={handleTimeOut}
                                    /> */}
                                    <TimePicker
                                        label="Time Out"
                                        value={timeOut}
                                        onChange={handleTimeOut}
                                    />
                                </Grid>
                                {/* <Grid item sm={12}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" value={isDoubleShift} onChange={handleIsDoubleShift} />}
                                        label="Is Double Shift?"
                                    />
                                </Grid> */}
                                <Grid item sm={6}>
                                    <Button variant='outlined' color='warning' onClick={handleResetFields}>Reset Fields</Button>
                                </Grid>
                                <Grid item sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant='contained' style={{ color: theme.palette.primary.contrastText }} type='submit'>Submit</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                ))}
            </div>
        </div>
    );
}

export default SupportStaffForm;
