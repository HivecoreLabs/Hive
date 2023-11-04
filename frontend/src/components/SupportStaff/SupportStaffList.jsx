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

const SupportStaffList = () => {
    const { supportStaff, fetchAllSupportStaffClockIns } = useSupportStaffContext();

    const sortedSupportStaff = [...supportStaff].sort((a, b) => {
        const timeA = new Date(a.time_in);
        const timeB = new Date(b.time_in);
        return timeA - timeB
    });

    const supportStaffList = supportStaff.length > 0 ? (
        sortedSupportStaff.map((supportEntry) => {
            return <SupportStaffListItem supportEntry={supportEntry} key={supportEntry.id} />
        })
    ) : null;

    useEffect(() => {
        fetchAllSupportStaffClockIns();
    }, []);

    return (
        <div className='support-staff-list-container'>
            <TableContainer component={Paper} sx={{ borderRadius: '8px', padding: '5px', paddingBottom: '0' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '8%', fontWeight: 'bold' }} variant='head'>Shift</TableCell>
                            <TableCell sx={{ width: '15%', fontWeight: 'bold' }} variant='head'>Employee</TableCell>
                            <TableCell sx={{ width: '12%', fontWeight: 'bold' }} variant='head'>Role</TableCell>
                            <TableCell sx={{ width: '20%', fontWeight: 'bold' }} variant='head'>Date</TableCell>
                            <TableCell sx={{ width: '15%', fontWeight: 'bold' }} variant='head'>Time In</TableCell>
                            <TableCell sx={{ width: '15%', fontWeight: 'bold' }} variant='head'>Time Out</TableCell>
                            <TableCell sx={{ width: '15%', fontWeight: 'bold' }} variant='head'>Actions</TableCell>
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
