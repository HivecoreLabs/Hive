import React from 'react';
import './CheckoutsPage.css';
import CheckoutsForm from './CheckoutsForm.jsx';
import ActiveSupportStaffList from './ActiveSupportStaffList.jsx';
import { useSupportStaffContext } from '../../contexts/SupportStaffContext';

const CheckoutsPage = () => {
    const { supportStaff, fetchAllSupportStaffClockIns } = useSupportStaffContext();

    return (
        <div className='checkouts-page-container'>
            <div className='checkout-form-support-staff-container'>
                <CheckoutsForm />
                <ActiveSupportStaffList />
            </div>
        </div>
    )
}

export default CheckoutsPage;
