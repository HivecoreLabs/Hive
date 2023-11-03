import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Select,
    MenuItem,
    Typography
} from '@mui/material';

const SupportStaffListItem = ({ supportEntry }) => {

    const convertTimeFromBackend = (backendTime) => {
        // remove the last 3 characters (the timezone information) and the colon
        const formattedTime = backendTime.slice(0, -4);
        return formattedTime;
    }

    return (
        <>
            <TableRow key={supportEntry.id}>
                <TableCell >
                    <Typography variant='h7'>
                        {supportEntry.employee.first_name} {supportEntry.employee.last_name}
                    </Typography>
                    {/* <Select
                        fullWidth
                        label="Employee"
                        variant="outlined"
                    // value={employee}
                    // onChange={handleEmployeeChange}
                    >
                    </Select> */}
                </TableCell>
                <TableCell>
                    <Select
                        fullWidth
                        label="Role"
                        variant="outlined"
                        sx={{ width: '100%' }}
                    // value={role}
                    // onChange={handleRoleChange}
                    >
                        {/* Render role options */}
                    </Select>
                </TableCell>
                <TableCell>
                    <DatePicker
                        fullWidth
                        label="Date"
                    // onChange={handleDateChange}
                    // value={date}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        fullWidth
                        id="time-in"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        label="Time In"
                    // value={timeIn}
                    // onChange={handleTimeInChange}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        fullWidth
                        id="time-out"
                        type="time"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        label="Time Out"
                    // value={timeOut}
                    // onChange={handleTimeOutChange}
                    />
                </TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                    // onClick={() => handleEditClick(entry.id)}
                    >
                        Edit
                    </Button>
                </TableCell>
            </TableRow>
        </>
    )
};

export default SupportStaffListItem;