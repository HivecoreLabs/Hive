import React from 'react';
import './index.css';

export default function EmployeeForm() {

    const testUsers = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            restaurantEmployeeId: 'EmpID22',
            isUploaded: false,
            foodPermitExp: 'Thur Oct 26 2023',
            alcoholPermitExp: 'Thur Oct 26 2023',
            roles: [
                {
                    role: 'Server'
                }
            ]
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Moore',
            restaurantEmployeeId: 'EmpID10',
            isUploaded: false,
            foodPermitExp: 'Thur Oct 26 2023',
            alcoholPermitExp: 'Thur Oct 26 2023',
            roles: [
                {
                    role: 'Busser'
                }
            ]
        },
        {
            id: 3,
            firstName: 'Lenore',
            lastName: 'Meyer',
            restaurantEmployeeId: 'EmpID23',
            isUploaded: false,
            foodPermitExp: 'Thur Oct 26 2023',
            alcoholPermitExp: 'Thur Oct 26 2023',
            roles: [
                {
                    role: 'Chef'
                },
                {
                    role: 'Carter'
                }
            ]
        }
    ];


    return (
        <>
            <div className='employee-form'>
                <div className='employee-form-header'>
                    <h1>Employee Form</h1>
                </div>
                <div className='employee-form-employees'>
                    <div className='employee-form-table-headers'>
                        <div className='employee-form-first-name'>
                            First Name
                        </div>
                        <div className='employee-form-last-name'>
                            Last Name
                        </div>
                        <div className='employee-form-restaurant-id'>
                            Restaurant ID
                        </div>
                        <div className='employee-form-role'>
                            Role (select all that apply)
                        </div>
                        <div className='employee-form-food-permit-exp'>
                            Food Permit Expiration
                        </div>
                        <div className='employee-form-alcohol-permit-exp'>
                            Alcohol Permit Expiration
                        </div>
                    </div>
                    {
                        testUsers?.map(user => (
                            <div className='employee-form-employee' id={user.id}>
                                <div className='employees-first-name'>
                                    {user.firstName}
                                </div>
                                <div className='employees-last-name'>
                                    {user.lastName}
                                </div>
                                <div className='employees-restaurant-id'>
                                    {user.restaurantEmployeeId}
                                </div>
                                <div className='employees-roles'>
                                    space
                                </div>
                                <div className='employee-food-permit-exp'>
                                    {user.foodPermitExp}
                                </div>
                                <div className='employee-alcohol-permit-exp'>
                                    {user.alcoholPermitExp}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='employee-form-actions'>
                    <button>Delete users</button>
                    <button>Add new user</button>
                </div>
            </div>
        </>
    );

}