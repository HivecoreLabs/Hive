import React, { useState, useLayoutEffect } from 'react';
import './SupportStaffPage.css';
import SupportStaffForm from './SupportStaffForm.jsx';
import SupportStaffList from './SupportStaffList.jsx';
import { Button, Box, Typography, Paper, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useDateContext } from '../../contexts/DateContext';
import { useTheme } from '@mui/material';
import ModalRoot from '../Modals/ModalRoot.jsx';
import { useModalContext } from '../../contexts/ModalContext';

const SupportStaffPage = () => {
    const theme = useTheme();
    const { stateDate } = useDateContext();
    const { openModal, modalDispatch } = useModalContext();
    const formattedDate = stateDate.format('dddd, MMM D YYYY');

    const handleOpenDateModal = () => {
        modalDispatch(openModal('ChangeDateModal'))
    }

    return (
        <div className='support-staff-page-container'>
            <div style={{ display: 'flex' }}>
                <Typography variant="h6" mb='20px'>
                    Clocking In/Out for: {formattedDate}
                    <Button variant='outlined' onClick={handleOpenDateModal} style={{ marginLeft: '10px', fontSize: '16px', textDecoration: 'underline', cursor: 'pointer' }}>
                        Change Date?
                    </Button>
                </Typography>
                <Button
                    sx={{
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        width: '180px',
                    }}
                    component={Link} to='/checkouts' variant='contained'>
                    Go To Checkouts
                </Button>
            </div>
            <SupportStaffForm />
            <SupportStaffList />
            {/* <Button sx={{ width: '200px', marginTop: '30px' }} component={Link} to='/checkouts' variant='contained'>Go To Checkouts</Button> */}
            <ModalRoot />
        </div>
    )
}

export default SupportStaffPage;
