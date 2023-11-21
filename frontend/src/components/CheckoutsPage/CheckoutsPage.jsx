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
import { useTheme } from '@mui/material';
import ModalRoot from '../Modals/ModalRoot.jsx';
import { useModalContext } from '../../contexts/ModalContext';

const CheckoutsPage = () => {
    const theme = useTheme();
    const { stateDate } = useDateContext();
    const { openModal, modalDispatch } = useModalContext();
    const formattedDate = stateDate.format('dddd, MMM D YYYY');

    const handleOpenDateModal = () => {
        modalDispatch(openModal('ChangeDateModal'))
    }

    return (
        <div className='checkouts-page-container'>
            <Typography variant="h6" mb='20px'>
                Checking Out for: {formattedDate}
                <Button variant='outlined' onClick={handleOpenDateModal} style={{ marginLeft: '10px', fontSize: '16px', textDecoration: 'underline', cursor: 'pointer' }}>
                    <Typography color={theme.palette.secondary.dark}>Change Date?</Typography>
                </Button>
            </Typography>
            <div className='checkout-form-support-staff-container'>
                <div>
                    <CheckoutsForm />
                    <CheckoutsList />
                </div>
                <ActiveSupportStaffList />
            </div>
            <ModalRoot />
        </div>
    )
}

export default CheckoutsPage;
