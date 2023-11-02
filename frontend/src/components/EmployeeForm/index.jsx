import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useEmployeesDispatch } from '../../contexts/EmployeesContext';
import { createEmployee, updateEmployee } from '../../contexts/EmployeesContext';
import { Button, Input, TextField } from '@mui/material';
import './index.css';

export default function EmployeeForm({ employee, formType }) {

    // const dispatch = useEmployeesDispatch();
    const { id } = useParams();

    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [restaurantId, setRestaurantId] = useState(employee.restaurantId);
    const [role, setRole] = useState([[...employee.role]]);
    const [foodPermitExp, setFoodPermitExp] = useState(employee.foodPermitExp);
    const [alcoholPermitExp, setAlcoholPermitExp] = useState(employee.alcoholPermitExp);
    const [formerEmployee, setFormerEmployee] = useState(employee.formerEmployee);

    const [validationErrors, setValidationErrors] = useState({
        firstName: '',
        lastName: '',
        restaurantId: '',
        role: '',
        foodPermitExp: '',
        alcoholPermitExp: ''
    });
    const [attempt, setAttempt] = useState(false);

    useEffect(() => {

        const errors = {};

        if (firstName.length > 50) errors.firstName = 'First Name can be no more than 50 characters.';
        if (lastName.length > 50) errors.lastName = 'Last Name can be no more than 50 characters.';
        if (restaurantId.length > 10) errors.restaurantId = 'Restaurant ID can be no more than 10 characters.';
        if (!role[0]) errors.role = 'Employee must have at least one role.';

        setValidationErrors(errors);

    }, [firstName, lastName, restaurantId, role, foodPermitExp, alcoholPermitExp])

    const handleSubmit = async (e) => {

        e.preventDefault();
        setAttempt(true);

        if (Object.values(validationErrors)[0]) return alert('Can not submit.');
        setAttempt(false);

        // if (formType === 'Create') {
        //     dispatch(
        //         createEmployee({
        //             first_name: firstName,
        //             last_name: lastName,
        //             roles: role,
        //             food_permit_exp: foodPermitExp,
        //             alcohol_permit_exp: alcoholPermitExp,
        //             is_former_employee: formerEmployee
        //         })
        //     );
        // } else if (formType === 'Edit') {
        //     dispatch(
        //         updateEmployee(id, {
        //             first_name: firstName,
        //             last_name: lastName,
        //             roles: role,
        //             food_permit_exp: foodPermitExp,
        //             alcohol_permit_exp: alcoholPermitExp,
        //             is_former_employee: formerEmployee
        //         })
        //     );
        // }

    };

    return (
        <div className='employee-form-container'>
            <div className='employee-form-header'>
                <h1>
                    {`${formType} Employee Form`}
                </h1>
            </div>
            <form 
            className='employee-form'
            onSubmit={handleSubmit}
            >
                <div className='employee-form-prompts'>
                    <div className='employee-form-first-name'>
                        {/* <label>
                            First Name
                        </label>
                        <input 
                            type='text'
                            id='first-name'
                            // placeholder='First Name'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        { attempt && validationErrors.firstName && (<div id='error'>{validationErrors.firstName}</div>) } */}
                        <TextField 
                            label='First Name'
                            type='text'
                            variant='outlined'
                            margin='normal'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='employee-form-last-name'>
                        {/* <label>
                            Last Name
                        </label>
                        <input 
                            type='text'
                            id='last-name'
                            // placeholder='Last Name'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        { attempt && validationErrors.lastName && (<div id='error'>{validationErrors.lastName}</div>) } */}
                        <TextField 
                            label='Last Name'
                            type='text'
                            variant='outlined'
                            margin='normal'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='employee-form-restaurant-id'>
                        {/* <label>
                            Restaurant ID
                        </label>
                        <input 
                            type='text'
                            id='restaurant-id'
                            // placeholder='Restaurant ID'
                            value={restaurantId}
                            onChange={e => setRestaurantId(e.target.value)}
                        />
                        { attempt && validationErrors.restaurantId && (<div id='error'>{validationErrors.restaurantId}</div>) } */}
                        <TextField 
                            label='Restaurant ID'
                            type='text'
                            variant='outline'
                            margin='normal'
                            value={restaurantId}
                            onChange={e => setRestaurantId(e.target.value)}
                            required
                        />
                    </div>
                    <div className='employee-form-role'>
                        <label>
                            Role (select all that apply)
                        </label>
                    </div>
                    <div className='employee-form-food-permit-exp'>
                        {/* <label>
                            Food Permit Expiration
                        </label>
                        <input
                            type='date'
                            id='food-permit-exp'
                            value={foodPermitExp}
                            onChange={e => setFoodPermitExp(e.target.value)}
                        /> */}
                        <Input 
                            label='Food Permit Expiration'
                            type='date'
                            margin='normal'
                            value={foodPermitExp}
                            onChange={e => setFoodPermitExp(e.target.value)}
                        />
                    </div>
                    <div className='employee-form-alcohol-permit-exp'>
                        {/* <label>
                            Alcohol Permit Exipration
                        </label>
                        <input
                            type='date'
                            id='alcohol-permit-exp'
                            value={alcoholPermitExp}
                            onChange={e => setAlcoholPermitExp(e.target.value)}
                        /> */}
                        <Input 
                            label='Alcohol Permit Expiration'
                            type='date'
                            margin='normal'
                            value={alcoholPermitExp}
                            onChange={e => setAlcoholPermitExp(e.target.value)}
                        />
                    </div>
                </div>
                <div className='employee-form-action'>
                    {/* <input 
                        className='employee-form-submit-button'
                        type='submit'
                        value = {`${formType} Employee`}
                    /> */}
                    <Button
                    variant='contained'
                    onClick={handleSubmit}
                    >
                        {`${formType} Employee`}
                    </Button>
                </div>
            </form>
        </div>
    );

}