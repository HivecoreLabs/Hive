import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
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
import { useRoles } from '../../contexts/RolesContext';
import { useSupportStaffContext } from '../../contexts/SupportStaffContext';

const SupportStaffListItem = ({ supportEntry }) => {

    const id = supportEntry.id;
    const { roles } = useRoles();
    const { updateSupportStaffClockIn } = useSupportStaffContext();

    // we need this when formatting times in the request body 
    const convertTimeFromFrontend = (frontendTime) => {
        const date = newDate(frontendTime);
        const dateString = date.toISOString();
        return dateString;
    }

    const convertTimeFromBackend = (backendTime) => {
        // remove the last 3 characters (the timezone information) and the colon
        const formattedTime = backendTime.slice(0, -4);
        return formattedTime;
    }

    // const [employee, setEmployee] = useState('');
    const [role, setRole] = useState(supportEntry.active_role.role);
    const [date, setDate] = useState(dayjs(supportEntry.date));
    const [timeIn, setTimeIn] = useState(convertTimeFromBackend(supportEntry.time_in));
    const [timeOut, setTimeOut] = useState(supportEntry.time_out);

    const [isEditing, setIsEditing] = useState(false);


    // const handleEmployee = (e) => {
    //     setEmployee(e.target.value);
    // }
    const handleRole = (value) => {
        setRole(value);
    }
    const handleDate = (value) => {
        setDate(value)
    }
    const handleTimeIn = (value) => {
        setTimeIn(value);
    }
    const handleTimeOut = (e) => {
        setTimeOut(value);
    }

    // const transformRolesForSelect = (roles) => {
    //     return roles.map((role) => ({
    //         id: role.id,
    //         role: role.role,
    //     }));
    // }

    // const newRoles = transformRolesForSelect(roles);
    // console.log(newRoles);
    // console.log(supportEntry.active_role);
    // const rolesList = roles.length > 0 ? (
    //     transformRolesForSelect(roles).map((role, idx) => (
    //         <MenuItem key={idx} value={role}>
    //             {role.role}
    //         </MenuItem>
    //     ))
    // ) : null;

    const rolesList = roles.length > 0 ? (
        roles.map((role) => (
            <MenuItem key={role.id} value={role.role}>
                {role.role}
            </MenuItem>
        ))
    ) : null;

    // creating a map for roles to their id's for handleUpdate
    const roleMap = {};
    roles.forEach((role) => {
        roleMap[role.role] = role.id;
    });

    const handleEditButton = () => {
        setIsEditing(prevState => !prevState);
    };

    const handleCancelButton = () => {
        setIsEditing(prevState => !prevState);
        // needs to reset values to previous
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedObject = {
            employee_id,
            active_role_id: roleMap[role],
            date: date.format('YYYY-MM-DD'),
            tipout_received,
            time_in: convertTimeFromFrontend(timeIn),
            time_out: convertTimeFromFrontend(timeOut),
        }

        updateSupportStaffClockIn(updatedObject, id);
    }


    return (
        <>
            <TableRow key={supportEntry.id}>
                <TableCell >
                    <Typography variant='h7'>
                        {supportEntry.employee.first_name} {supportEntry.employee.last_name}
                    </Typography>
                </TableCell>
                <TableCell>
                    {isEditing ? (
                        <TextField
                            select
                            fullWidth
                            label="Role"
                            variant="outlined"
                            value={role}
                            onChange={handleRole}
                        >
                            {rolesList}
                        </TextField>
                    ) : (
                        <TextField
                            select
                            fullWidth
                            label="Role"
                            variant="outlined"
                            value={role}
                            onChange={handleRole}
                            disabled
                        >
                            {rolesList}
                        </TextField>)}
                </TableCell>
                <TableCell>
                    {isEditing ? (
                        <DatePicker
                            sx={{ width: '100%' }}
                            label="Date"
                            value={date}
                            onChange={handleDate}
                        />) : (<DatePicker
                            sx={{ width: '100%' }}
                            label="Date"
                            value={date}
                            onChange={handleDate}
                            disabled
                        />)}
                </TableCell>
                <TableCell>
                    {isEditing ? (
                        <TimePicker
                            fullWidth
                            label="Time In"
                            value={timeIn}
                            onChange={handleTimeIn}
                        />) : (
                        <TimePicker
                            fullWidth
                            label="Time In"
                            value={timeIn}
                            onChange={handleTimeIn}
                            disabled
                        />)}
                </TableCell>
                <TableCell>
                    {isEditing ? (
                        <TimePicker
                            fullWidth
                            label="Time Out"
                            value={timeOut}
                            onChange={handleTimeOut}
                        />) : (
                        <TimePicker
                            fullWidth
                            label="Time Out"
                            value={timeOut}
                            onChange={handleTimeOut}
                            disabled
                        />)}
                </TableCell>
                <TableCell>
                    <div>
                        {isEditing ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" color='warning' onClick={handleCancelButton}>Cancel</Button>
                                <Button variant="contained" onClick={handleUpdate}>Update</Button>
                            </div>
                        ) : (
                            <Button variant="contained" onClick={handleEditButton}>Edit</Button>
                        )}
                    </div>
                </TableCell>
            </TableRow >
        </>
    )
};

export default SupportStaffListItem;