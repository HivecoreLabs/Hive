import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Radio, RadioGroup, FormLabel, TextField, InputLabel, InputAdornment, Button, OutlinedInput, FormControl, FormControlLabel, Checkbox, MenuItem, Menu } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import './CheckoutsForm.css';
import { useEmployees } from '../../contexts/EmployeesContext';
import { useRoles } from '../../contexts/RolesContext';
import { useSupportStaffContext } from '../../contexts/SupportStaffContext';
import { useCheckoutsContext } from '../../contexts/CheckoutsContext';
import { useTheme } from '@mui/material';

const CheckoutsForm = () => {

    const theme = useTheme();
    const { employees } = useEmployees();
    const { role, roles, readSingleRole } = useRoles();
    const { createCheckout } = useCheckoutsContext();

    const servers = role.employees
    const serverList = servers?.length > 0 ? (
        role.employees.map((server) => {
            return (
                <MenuItem key={server.id} value={server}>
                    {server.first_name} {server.last_name}
                </MenuItem>
            )
        })
    ) : null

    const [server, setServer] = useState('');
    const [netSales, setNetSales] = useState('');
    const [cashOwed, setCashOwed] = useState('');
    const [date, setDate] = useState(dayjs());
    const [isAMShift, setIsAMShift] = useState(theme.isAMShift)
    const [patio, setPatio] = useState(false);
    const [bar, setBar] = useState(false);

    const handleServer = (e) => setServer(e.target.value);
    const handleNetSales = (e) => {
        setNetSales(parseFloat(e.target.value));
    };
    const handleCashOwed = (e) => {
        setCashOwed(parseFloat(e.target.value));
    };
    const handleDate = (value) => {
        setDate(value);
    }
    const handleShift = (e) => {
        setIsAMShift(e.target.value);
    }
    const handlePatio = (e) => {
        setPatio(e.target.value);
    }
    const handleBar = (e) => {
        setBar(e.target.value);
    }

    const handleResetFields = () => {
        setServer('');
        setNetSales('');
        setCashOwed('');
        setIsAMShift(theme.isAMShift);
    }

    const handleSubmit = (e) => {
        debugger
        e.preventDefault();

        const newCheckout = {
            employee_id: server.id,
            net_sales: netSales,
            cash_owed: cashOwed,
            tipout_day: date.format('YYYY-MM-DD'),
            date: date.format('YYYY-MM-DD'),
            is_am_shift: isAMShift,
            is_patio: patio
        };

        createCheckout(newCheckout);
    };

    useEffect(() => {
        readSingleRole(1);
    }, [])

    return (
        <div>
            <div className='checkouts-form-container'>
                {[...Array(1)].map((_, index) => (
                    <Paper elevation={2} style={{ padding: '20px', marginBottom: '10px', width: '600px', borderRadius: '8px', }} key={index}>
                        <Typography variant="h5" align="center" fontWeight='bold' mb='20px'>
                            Add Server Checkout
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item sm={5}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Employee"
                                        variant="outlined"
                                        value={server}
                                        onChange={handleServer}
                                        required
                                    >
                                        <div></div>
                                        {serverList}
                                    </TextField>
                                </Grid>
                                <Grid item sm={3.5}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-amount">Net Sales</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Net Sales"
                                            type='number'
                                            onChange={handleNetSales}
                                            value={netSales}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={3.5} >
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-amount">Cash Owed</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Cash Owed"
                                            type='number'
                                            onChange={handleCashOwed}
                                            value={cashOwed}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={4}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <DatePicker
                                            sx={{ width: '100%' }}
                                            label="Date"
                                            onChange={handleDate}
                                            value={dayjs(date)}
                                        />
                                        {/* <Button sx={{ marginTop: '15px', width: '75%' }} variant='outlined' color='warning' onClick={handleResetFields}>Reset Fields</Button> */}
                                    </div>
                                </Grid>
                                <Grid item sm={1.5} sx={{ marginLeft: '20px' }} >
                                    <FormControl>
                                        <FormLabel id="shift-buttons-group">Shift</FormLabel>
                                        <RadioGroup
                                            value={isAMShift}
                                            name="shift-buttons-group"
                                            onChange={handleShift}
                                        >
                                            <FormControlLabel value={true} control={<Radio size='small' />} label="AM" />
                                            <FormControlLabel value={false} control={<Radio size='small' />} label="PM" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={1.5}  >
                                    <FormControl >
                                        <FormLabel id="patio-buttons-group">Patio</FormLabel>
                                        <RadioGroup
                                            value={patio}
                                            name="patio-buttons-group"
                                            onChange={handlePatio}
                                        >
                                            <FormControlLabel value={false} control={<Radio size='small' />} label="no" />
                                            <FormControlLabel value={true} control={<Radio size='small' />} label="yes" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={1.5} >
                                    <FormControl>
                                        <FormLabel id="bar-buttons-group">Bar</FormLabel>
                                        <RadioGroup
                                            value={bar}
                                            name="bar-buttons-group"
                                            onChange={handleBar}
                                        >
                                            <FormControlLabel value={false} control={<Radio size='small' />} label="no" />
                                            <FormControlLabel value={true} control={<Radio size='small' />} label="yes" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={3.1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }} >
                                    <Button sx={{ marginBottom: '14px' }} variant='outlined' color='warning' onClick={handleResetFields}>Reset Fields</Button>
                                    <Button sx={{ width: '75%' }} variant='contained' style={{ color: theme.palette.primary.contrastText }} type='submit'>Submit</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                ))}
            </div>
        </div>
    )
};

export default CheckoutsForm;