import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Radio, RadioGroup, FormLabel, TextField, InputLabel, InputAdornment, Button, OutlinedInput, FormControl, FormControlLabel, Checkbox, MenuItem, Menu } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import './BartenderCheckoutsForm.css';
import { useEmployees } from '../../contexts/EmployeesContext';
import { useRoles } from '../../contexts/RolesContext';
import { useSupportStaffContext } from '../../contexts/SupportStaffContext';
import { useCheckoutsContext } from '../../contexts/CheckoutsContext';
import { useTheme } from '@mui/material';
import { useDateContext } from '../../contexts/DateContext';

const BartenderCheckoutsForm = () => {

    const theme = useTheme();
    const { employees } = useEmployees();
    const { role, readSingleRole } = useRoles();
    const { createCheckout } = useCheckoutsContext();
    const { stateDate, changeStateDate } = useDateContext();

    const servers = role.employees
    const bar = {
        first_name: 'BAR',

        // change this once backend updates the BAR role
        employee_id: 13
    };

    const serverList = servers?.length > 0 ? (
        role.employees.map((server) => {
            return (
                <MenuItem key={server.id} value={server}>
                    {server.first_name} {server.last_name ? server.last_name : ''}
                </MenuItem>
            )
        })
    ) : null

    const [server, setServer] = useState('');
    const [netSales, setNetSales] = useState('');
    const [cashOwed, setCashOwed] = useState('');
    const [date, setDate] = useState(stateDate);
    const [isAMShift, setIsAMShift] = useState(theme.isAMShift)
    const [patio, setPatio] = useState(false);
    // const [bar, setBar] = useState(false);

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
    const handleShift = () => {
        setIsAMShift(prevState => !prevState);
    }
    const handlePatio = (e) => {
        setPatio(e.target.value);
    }
    // const handleBar = (e) => {
    //     setBar(e.target.value);
    // }

    const handleResetFields = () => {
        setServer('');
        setNetSales('');
        setCashOwed('');
        setDate(stateDate);
        setPatio(false);
        // setBar(false);
        setIsAMShift(theme.isAMShift);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCheckout = {
            employee_id: server.id,
            net_sales: netSales,
            cash_owed: cashOwed,
            tipout_day: date.format('YYYY-MM-DD'),
            date: date.format('YYYY-MM-DD'),
            is_am_shift: isAMShift,
            is_patio: patio,

            // this will be based on whether BAR is selected
            is_bar: false
        };

        handleResetFields();
        createCheckout(newCheckout);
    };

    useEffect(() => {
        readSingleRole(12);
    }, [])

    useEffect(() => {
        setDate(stateDate);
    }, [stateDate])

    return (
        <div>
            <div className='bartender-checkouts-form-container'>
                <Paper elevation={2} style={{ padding: '20px', marginBottom: '10px', width: '600px', borderRadius: '8px', }} >
                    <Typography variant="h5" align="center" fontWeight='bold' mb='20px'>
                        Add Bartender Checkout
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
                            <Grid item sm={5}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <DatePicker
                                        // sx={{ width: '100%' }}
                                        label="Date"
                                        onChange={handleDate}
                                        value={date}
                                        disableFuture={true}
                                    />
                                    {/* <Button sx={{ marginTop: '15px', width: '75%' }} variant='outlined' color='warning' onClick={handleResetFields}>Reset Fields</Button> */}
                                </div>
                            </Grid>
                            <Grid item sm={4} sx={{ display: 'flex', justifyContent: 'space-around' }}>
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
                            <Grid item sm={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }} >
                                <Button sx={{ marginBottom: '14px' }} variant='outlined' color='warning' onClick={handleResetFields}>Reset Fields</Button>
                                <Button sx={{ width: '75%' }} variant='contained' style={{ color: theme.palette.primary.contrastText }} type='submit'>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        </div>
    )
};

export default BartenderCheckoutsForm;