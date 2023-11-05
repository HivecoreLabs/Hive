import React, { useState, useEffect } from 'react';
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
    Typography,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSupportStaffContext } from '../../contexts/SupportStaffContext';
import { useDateContext } from '../../contexts/DateContext';

const ActiveSupportStaffList = () => {
    const { supportStaff, fetchAllSupportStaffClockInsByDate } = useSupportStaffContext();
    const [supportStaffList, setSupportStaffList] = useState([]);
    const { stateDate, changeStateDate } = useDateContext();

    useEffect(() => {
        const formattedDate = stateDate.format('YYYY-MM-DD');
        fetchAllSupportStaffClockInsByDate(formattedDate);
    }, [stateDate]);

    useEffect(() => {
        // const filteredSupportStaff = supportStaff.filter(support => support.active_role.id !== 1);
        // setSupportStaffList(filteredSupportStaff);
        setSupportStaffList(supportStaff);
    }, [supportStaff]);

    supportStaffList.sort((a, b) => a.active_role.role.localeCompare(b.active_role.role));

    return (
        <div>
            <Paper sx={{ borderRadius: '8px', padding: '10px', paddingTop: '10px', marginLeft: '30px' }}>
                <Typography variant="h6" fontWeight='bold' textAlign='center' sx={{ position: 'sticky', marginBottom: '10px' }}>
                    Active Support Staff
                </Typography>
                <TableContainer sx={{ maxHeight: '500px', overflowY: 'scroll' }} >
                    <Table >
                        <TableBody>
                            {supportStaffList.map((support) => (
                                <TableRow key={support.id}>
                                    <TableCell>
                                        {support.employee.first_name} {support.employee.last_name}
                                    </TableCell>
                                    <TableCell>{support.active_role.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </TableContainer>
                <Button
                    component={Link}
                    to="/support"
                    variant="contained"
                    color="primary"
                    size="medium"
                    sx={{
                        marginTop: '15px', marginBottom: '8px', marginLeft: 'auto', marginRight: 'auto', display: 'block', width: 'fit-content',
                    }}
                >
                    Add Support Staff
                </Button>
            </Paper>

        </div >
    )
};

export default ActiveSupportStaffList;