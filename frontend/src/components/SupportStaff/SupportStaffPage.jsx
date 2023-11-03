import React from 'react';
import './SupportStaffPage.css';
import SupportStaffForm from './SupportStaffForm.jsx';
import SupportStaffList from './SupportStaffList.jsx';

function SupportStaffPage() {
    return (
        <div className='support-staff-page-container'>
            <SupportStaffForm />
            <SupportStaffList />
        </div>
    )
}

export default SupportStaffPage;
