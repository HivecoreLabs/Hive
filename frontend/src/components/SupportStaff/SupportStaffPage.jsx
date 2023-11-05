import React from 'react';
import './SupportStaffPage.css';
import SupportStaffForm from './SupportStaffForm.jsx';
import SupportStaffList from './SupportStaffList.jsx';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const SupportStaffPage = () => {
    return (
        <div className='support-staff-page-container'>
            <SupportStaffForm />
            <SupportStaffList />
            <Button sx={{ width: '200px', marginTop: '20px' }} component={Link} to='/checkouts' variant='contained'>Go To Checkouts</Button>
        </div>
    )
}

export default SupportStaffPage;
