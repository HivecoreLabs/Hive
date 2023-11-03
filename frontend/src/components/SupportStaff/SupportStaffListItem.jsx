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

const SupportStaffListItem = React.memo(({ supportEntry }) => {
    const { id, employee, active_role } = supportEntry;
    debugger
    // const { roles } = useRoles();
    const { updateSupportStaffClockIn, deleteSupportStaffClockIn } = useSupportStaffContext();

    // we need this when formatting times in the request body 
    const convertTimeFromFrontend = (frontendTime) => {
        const date = new Date(frontendTime);
        const dateString = date.toISOString();
        return dateString;
    }

    const convertTimeFromBackend = (backendTime) => {
        // remove the last 3 characters (the timezone information) and the colon
        const formattedTime = backendTime.slice(0, -4);
        return formattedTime;
    }

    // const [employee, setEmployee] = useState('');

    // const transformRolesForSelect = (roles) => {
    //     return roles.map((role) => ({
    //         id: role.id,
    //         role: role.role,
    //     }));
    // }
    // const transformedRoles = transformRolesForSelect(roles);

    // const [role, setRole] = useState(
    //     transformedRoles.find((role) => supportEntry.active_role.id === role.id)
    // );
    const [role, setRole] = useState(active_role);
    const [date, setDate] = useState(dayjs(supportEntry.date));
    const [timeIn, setTimeIn] = useState(dayjs(supportEntry.time_in));
    const [timeOut, setTimeOut] = useState(dayjs(supportEntry.time_out));

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
    const handleTimeOut = (value) => {
        setTimeOut(value);
    }

    // const transformedRoles = transformRolesForSelect(roles);

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

    // console.log(transformedRoles);
    // console.log(role);

    // const rolesList = isEditing ? (
    //     <TextField
    //         select
    //         fullWidth
    //         label="Role"
    //         variant="outlined"
    //         value={role}
    //         onChange={handleRole}
    //     >
    //         {transformedRoles.map((role) => (
    //             <MenuItem key={role.id} value={role.id}>
    //                 {role.role}
    //             </MenuItem>
    //         ))}
    //     </TextField>
    // ) : (
    //     <TextField
    //         select
    //         fullWidth
    //         label="Role"
    //         variant="outlined"
    //         value={role}
    //         onChange={handleRole}
    //         disabled
    //     >
    //         {transformedRoles.map((role) => (
    //             <MenuItem key={role.id} value={role.id}>
    //                 {role.role}
    //             </MenuItem>
    //         ))}
    //     </TextField>
    // );

    // creating a map for roles to their id's for handleUpdate
    // const roleMap = {};
    // roles.forEach((role) => {
    //     roleMap[role.role] = role.id;
    // });

    const handleEditToggle = () => {
        setIsEditing(prevState => !prevState);
    };

    const handleCancel = () => {
        setIsEditing(prevState => !prevState);
        // needs to reset values to previous
        // setRole(supportEntry.active_role.role);
        setDate(dayjs(supportEntry.date));
        setTimeIn(dayjs(supportEntry.time_in));
        setTimeOut(dayjs(supportEntry.time_out));
    };

    const handleDelete = () => {
        debugger
        deleteSupportStaffClockIn(id)
        handleEditToggle();
        debugger
    }

    const handleUpdate = (e) => {
        debugger
        e.preventDefault();

        const updatedClockIn = {
            // ...supportEntry,
            employee_id: employee.id,
            active_role_id: role.id,
            date: date.format('YYYY-MM-DD'),
            time_in: convertTimeFromFrontend(timeIn),
            time_out: convertTimeFromFrontend(timeOut),
            // tipout_received,
        }

        updateSupportStaffClockIn(updatedClockIn, id);
        handleEditToggle();
    }


    return (
        <>
            <TableRow key={supportEntry.id}>
                <TableCell >
                    <Typography variant='h7'>
                        {employee.first_name} {employee.last_name}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography variant='h7'>
                        {role.role}
                    </Typography>
                    {/* {isEditing ? (
                        <TextField
                            select
                            fullWidth
                            label="Role"
                            defaultValue={null}
                            variant="outlined"
                            value={rolesList ? role : {}}
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
                            value={rolesList ? role : {}}
                            onChange={handleRole}
                            disabled
                        >
                            {rolesList}
                        </TextField>
                    )} */}
                    {/* {rolesList} */}
                </TableCell>
                <TableCell>
                    {isEditing ? (
                        <DatePicker
                            sx={{ width: '100%' }}
                            label="Date"
                            value={date}
                            onChange={handleDate}
                        />) : (
                        <DatePicker
                            sx={{ width: '100%' }}
                            label="Date"
                            value={date}
                            // onChange={handleDate}
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
                        />
                    ) : (
                        <TimePicker
                            fullWidth
                            label="Time In"
                            value={timeIn}
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
                            // onChange={handleTimeOut}
                            disabled
                        />)}
                </TableCell>
                <TableCell>
                    <div>
                        {isEditing ? (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="contained" onClick={handleUpdate}>Update</Button>
                                <Button variant="outlined" color='warning' onClick={handleCancel}>Cancel</Button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={handleEditToggle}>Edit</Button>
                                <Button variant="outlined" color='warning' onClick={handleDelete}>Delete</Button>
                            </div>
                        )}
                    </div>
                </TableCell>
            </TableRow >
        </>
    )
});

export default SupportStaffListItem;