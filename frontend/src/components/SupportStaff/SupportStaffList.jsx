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
import { useSupportStaffContext } from '../../contexts/SupportStaffContext';
import './SupportStaffList.css';
import SupportStaffListItem from './SupportStaffListItem.jsx';

export const SupportStaffList = () => {
    const { supportStaff, fetchAllSupportStaffClockIns } = useSupportStaffContext();
    console.log(supportStaff);
    const supportStaffList = supportStaff.length > 0 ? (
        supportStaff.map((supportEntry) => {
            return <SupportStaffListItem supportEntry={supportEntry} key={supportEntry.id} />
        })
    ) : null;

    useEffect(() => {
        fetchAllSupportStaffClockIns();
    }, []);

    return (
        <div className='support-staff-list-container'>
            <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time In</TableCell>
                            <TableCell>Time Out</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {supportStaffList}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default SupportStaffList;
