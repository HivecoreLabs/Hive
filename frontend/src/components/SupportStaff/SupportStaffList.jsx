import React, { useState, useEffect } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { useSupportStaffContext } from '../../contexts/SupportStaffContext';
import { useDateContext } from '../../contexts/DateContext';
import './SupportStaffList.css';
import SupportStaffListItem from './SupportStaffListItem.jsx';
import { useTheme } from '@mui/material';

const SupportStaffList = () => {
    const theme = useTheme();
    const { stateDate } = useDateContext();
    const { clearSupportStaff } = useSupportStaffContext();
    const { supportStaff, fetchAllSupportStaffClockIns, fetchAllSupportStaffClockInsByDate } = useSupportStaffContext();
    const sortedSupportStaff = [...supportStaff].sort((a, b) => {
        const timeA = new Date(a.time_in);
        const timeB = new Date(b.time_in);
        return timeA - timeB
    });

    const supportStaffList = supportStaff.length > 0 ? (
        sortedSupportStaff.map((supportEntry) => {
            return <SupportStaffListItem supportEntry={supportEntry} key={supportEntry.id} />
        })
    ) : null

    useEffect(() => {
        const formattedDate = stateDate.format('YYYY-MM-DD');
        fetchAllSupportStaffClockInsByDate(formattedDate);
    }, [stateDate]);

    return (
        <div className='support-staff-list-container'>
            {supportStaffList ? (
                <TableContainer component={Paper} sx={{ borderRadius: '8px', padding: '5px', paddingBottom: '0', maxHeight: '600px' }}>
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
            ) : (
                <div>
                    <TableContainer component={Paper} sx={{ borderRadius: '8px', padding: '20px', paddingBottom: '0', maxHeight: '600px', width: '600px', }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }} variant='head'>Shift</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} variant='head'>Employee</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} variant='head'>Role</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} variant='head'>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} variant='head'>Time In</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} variant='head'>Time Out</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} variant='head'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                        <Typography variant='h9' sx={{ textAlign: 'center', display: 'inline-block', width: '100%', padding: '10px' }} color={theme.palette.primary.light}>no support staff have clocked-in yet</Typography>
                    </TableContainer>
                </div>

            )
            }
        </div >
    );
}

export default SupportStaffList;
