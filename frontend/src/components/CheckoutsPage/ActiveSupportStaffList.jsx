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

const ActiveSupportStaffList = () => {
    const { supportStaff, fetchAllSupportStaffClockIns } = useSupportStaffContext();
    const [supportStaffList, setSupportStaffList] = useState([]);

    useEffect(() => {
        fetchAllSupportStaffClockIns();
    }, []);

    console.log(supportStaff);
    useEffect(() => {
        debugger
        const filteredSupportStaff = supportStaff.filter(support => support.active_role.id !== 1);
        setSupportStaffList(filteredSupportStaff);
    }, [supportStaff]);

    supportStaffList.sort((a, b) => a.active_role.role.localeCompare(b.active_role.role));

    return (
        <div>
            <Paper sx={{ borderRadius: '8px', padding: '5px', paddingTop: '10px', marginLeft: '30px' }}>
                <Typography variant="h6" fontWeight='bold' textAlign='center' sx={{ position: 'sticky', marginBottom: '5px' }}>
                    Active Support Staff
                </Typography>
                <TableContainer sx={{ maxHeight: '300px', overflowY: 'scroll' }} >
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
                    variant="outlined"
                    color="primary"
                    size="medium"
                    sx={{
                        marginTop: '12px', marginBottom: '8px', marginLeft: 'auto', marginRight: 'auto', display: 'block', width: 'fit-content',
                    }}
                >
                    Add Support Staff
                </Button>
            </Paper>

        </div >
    )
};

export default ActiveSupportStaffList;