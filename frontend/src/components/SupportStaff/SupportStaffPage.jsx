import React, { useState, useLayoutEffect } from 'react';
import './SupportStaffPage.css';
import SupportStaffForm from './SupportStaffForm.jsx';
import SupportStaffList from './SupportStaffList.jsx';
import { Button, Box, Typography, Paper, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useDateContext } from '../../contexts/DateContext';
import { useTheme } from '@mui/material';

const SupportStaffPage = () => {
    const theme = useTheme();
    const { stateDate, changeStateDate } = useDateContext();
    const [date, setDate] = useState(stateDate);
    const formattedDate = date.format('dddd, MMM D YYYY');
    const [openModal, setOpenModal] = useState(false);

    const handleDate = (value) => {
        setDate(value);
    }

    const handleDateChange = () => {
        changeStateDate(date);
        handleCloseModal();
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div className='support-staff-page-container'>
            <Typography variant="h6" mb='20px'>
                Clocking In/Out for: {formattedDate}
                <Button component={Link} variant='outlined' onClick={handleOpenModal} style={{ marginLeft: '10px', fontSize: '16px', textDecoration: 'underline', cursor: 'pointer' }}>
                    <Typography color={theme.palette.secondary.dark}>Change Date?</Typography>
                </Button>
            </Typography>
            <SupportStaffForm />
            <SupportStaffList />
            <Button sx={{ width: '200px', marginTop: '30px' }} component={Link} to='/checkouts' variant='contained'>Go To Checkouts</Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
            >
                <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', minWidth: '300px' }}>

                    <div >
                        <Typography variant="h6" sx={{ marginRight: '10px', marginBottom: '15px', marginTop: '-5px' }}>
                            Choose a Date for Your Clock-Ins/Checkouts
                            <IconButton
                                color='inherit'
                                onClick={handleCloseModal}
                                sx={{ marginLeft: '10px', position: 'relative', left: '12px' }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                    </div>
                    <DatePicker
                        value={date}
                        onChange={handleDate}
                    />
                    <Button
                        variant='contained'
                        onClick={handleDateChange}
                        style={{ float: 'right', marginTop: '17px' }}
                    >
                        Change
                    </Button>
                </Paper>
            </Modal>
        </div>
    )
}

export default SupportStaffPage;

// style = {{ position: 'absolute', top: '5px', right: '5px' }}