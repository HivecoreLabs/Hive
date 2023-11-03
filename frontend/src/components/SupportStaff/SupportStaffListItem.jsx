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
                <TableCell>
                    <Select
                        fullWidth
                        label="Employee"
                        variant="outlined"
                    // value={employee}
                    // onChange={handleEmployeeChange}
                    >
                        {/* Render employee options */}
                    </Select>
                </TableCell>
                <TableCell>
                    <Select
                        fullWidth
                        label="Role"
                        variant="outlined"
                    // value={role}
                    // onChange={handleRoleChange}
                    >
                        {/* Render role options */}
                    </Select>
                </TableCell>
                <TableCell>
                    <DatePicker
                        sx={{ width: '100%' }}
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