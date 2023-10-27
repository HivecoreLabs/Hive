import React from 'react';
import './index.css';

export default function EmployeeForm() {

    const testUsers = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            restaurantEmployeeId: '00abc123',
            isUploaded: false,
            foodPermitExp: '',
            alcoholPermitExp: '',
            roles: [
                {
                    role: 'Server'
                }
            ]
        },

    ];


    return (
        <>
            <div className='employee-form'>
                <div className='employee-form-header'>
                    <h1>Employee Form</h1>
                </div>
            </div>
        </>
    );

}