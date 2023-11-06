import React, { useState } from 'react';
import './CheckoutsPage.css';
import CheckoutsForm from './CheckoutsForm.jsx';
import ActiveSupportStaffList from './ActiveSupportStaffList.jsx';
import { useSupportStaffContext } from '../../contexts/SupportStaffContext';
import { useDateContext } from '../../contexts/DateContext';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Paper, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckoutsList from './CheckoutsList.jsx';

const CheckoutsPage = () => {
    const { supportStaff, fetchAllSupportStaffClockIns } = useSupportStaffContext();
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
        <div className='checkouts-page-container'>
            <Typography variant="h6" mb='20px'>
                Checking Out for: {formattedDate}
                <Button component={Link} onClick={handleOpenModal} style={{ marginLeft: '10px', fontSize: '16px', textDecoration: 'underline', cursor: 'pointer' }}>
                    Change Date?
                </Button>
            </Typography>
            <div className='checkout-form-support-staff-container'>
                <div>
                    <CheckoutsForm />
                    <CheckoutsList />
                </div>
                <ActiveSupportStaffList />
            </div>
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

export default CheckoutsPage;
