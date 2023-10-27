import React, { useEffect, useState } from 'react';
import './index.css';

export default function EmployeeForm({ employee, formType }) {

    // const testUsers = [
    //     {
    //         id: 1,
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         restaurantEmployeeId: 'EmpID22',
    //         isUploaded: false,
    //         foodPermitExp: 'Thur Oct 26 2023',
    //         alcoholPermitExp: 'Thur Oct 26 2023',
    //         roles: [
    //             {
    //                 role: 'Server'
    //             }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         firstName: 'Jane',
    //         lastName: 'Moore',
    //         restaurantEmployeeId: 'EmpID10',
    //         isUploaded: false,
    //         foodPermitExp: 'Thur Oct 26 2023',
    //         alcoholPermitExp: 'Thur Oct 26 2023',
    //         roles: [
    //             {
    //                 role: 'Busser'
    //             }
    //         ]
    //     },
    //     {
    //         id: 3,
    //         firstName: 'Lenore',
    //         lastName: 'Meyer',
    //         restaurantEmployeeId: 'EmpID23',
    //         isUploaded: false,
    //         foodPermitExp: 'Thur Oct 26 2023',
    //         alcoholPermitExp: 'Thur Oct 26 2023',
    //         roles: [
    //             {
    //                 role: 'Chef'
    //             },
    //             {
    //                 role: 'Carter'
    //             }
    //         ]
    //     }
    // ];

    formType = 'create';

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const [role, setRole] = useState([]);
    const [foodPermitExp, setFoodPermitExp] = useState('');
    const [alcoholPermitExp, setAlcoholPermitExp] = useState('');

    const [validationErrors, setValidationErrors] = useState({

    });
    const [attempt, setAttempt] = useState(false);

    const handleSubmit = async (e) => {



    };

    return (
        <div className='employee-form-container'>
            <div className='employee-form-header'>
                {`${formType === 'create' ? 'Create': 'Edit'} Employee Form`}
            </div>
            <form 
            className='employee-form'
            onSubmit={handleSubmit}
            >
                <div className='employee-form-first-name'>
                    <label>
                        First Name
                    </label>
                    <input 
                        type='text'
                        id='first-name'
                        // placeholder='First Name'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className='employee-form-last-name'>
                    <label>
                        Last Name
                    </label>
                    <input 
                        type='text'
                        id='last-name'
                        // placeholder='Last Name'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className='employee-form-restaurant-id'>
                    <label>
                        Restaurant ID
                    </label>
                    <input 
                        type='text'
                        id='restaurant-id'
                        // placeholder='Restaurant ID'
                        value={restaurantId}
                        onChange={e => setRestaurantId(e.target.value)}
                    />
                    
                </div>
                <div className='employee-form-role'>
                    <label>
                        Role (select all that apply)
                    </label>
                </div>
                <div className='employee-form-food-permit-exp'>
                    <label>
                        Food Permit Expiration
                    </label>
                    <input
                        type='date'
                        id='food-permit-exp'
                        value={foodPermitExp}
                        onChange={e => setFoodPermitExp(e.target.value)}
                    />
                </div>
                <div className='employee-form-alcohol-permit-exp'>
                    <label>
                        Alcohol Permit Exipration
                    </label>
                    <input
                        type='date'
                        id='alcohol-permit-exp'
                        value={alcoholPermitExp}
                        onChange={e => setAlcoholPermitExp(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );

}