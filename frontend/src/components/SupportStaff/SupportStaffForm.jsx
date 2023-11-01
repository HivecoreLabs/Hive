import React, { useState } from 'react';
import { Grid, Typography, Paper, TextField, Button, FormControlLabel, Checkbox, MenuItem } from '@mui/material';

function SupportStaffForm() {

    const [rowCount, setRowCount] = useState(1);
    const roles = ['Role 1', 'Role 2', 'Role 3'];
    const employees = ['Employee 1', 'Employee 2', 'Employee 3'];
    const addRow = () => {
        setRowCount(rowCount + 1);
    };

    return (
        <div>
            <Typography variant="h5" align="center" mb='20px'>
                Active Support Staff
            </Typography>
            {[...Array(8)].map((_, index) => (
                <Paper elevation={2} style={{ padding: '10px', marginBottom: '10px' }} key={index}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={2.5}>
                            <TextField
                                select
                                fullWidth
                                label="Employee"
                                variant="outlined"
                                value={employees[0]}
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
                        <Grid item xs={12} sm={2}>
                            <TextField
                                select
                                fullWidth
                                label="Current Role"
                                variant="outlined"
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
                        <Grid item xs={12} sm={2}>
                            <TextField
                                fullWidth
                                id="time-in"
                                type='time'
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                label="Time In"
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField
                                fullWidth
                                id="time-out"
                                type='time'
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                label="Time Out"
                            />
                        </Grid>
                        <Grid item xs={12} sm={1.5}>
                            <TextField
                                select
                                fullWidth
                                label="AM/PM Shift"
                                variant="outlined"
                                defaultValue="AM"
                            >
                                <MenuItem value="AM">AM</MenuItem>
                                <MenuItem value="PM">PM</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Is Double Shift?"
                            />
                        </Grid>
                    </Grid>
                </Paper>
            ))}

            <Button variant="contained" color="primary" onClick={addRow}>
                Add Support Staff Member
            </Button>
        </div>
    );
}

export default SupportStaffForm;
