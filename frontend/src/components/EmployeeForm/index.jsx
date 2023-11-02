import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEmployees } from '../../contexts/EmployeesContext';
import { Button, Input, TextField } from '@mui/material';
import './index.css';

export default function EmployeeForm({ employee, formType }) {

    
    const { id } = useParams();

    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [restaurantId, setRestaurantId] = useState(employee.restaurantId);
    const [role, setRole] = useState([[...employee.role]]);
    const [foodPermitExp, setFoodPermitExp] = useState(employee.foodPermitExp);
    const [alcoholPermitExp, setAlcoholPermitExp] = useState(employee.alcoholPermitExp);
    const [formerEmployee, setFormerEmployee] = useState(employee.formerEmployee);


    const handleSubmit = async (e) => {

        e.preventDefault();
      


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
                        <TextField 
                            label='First Name'
                            type='text'
                            variant='outlined'
                            margin='normal'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            required
                            error={ firstName && firstName.length > 50 ? true: false }
                        />
                    </div>
                    <div className='employee-form-last-name'>
                        <TextField 
                            label='Last Name'
                            type='text'
                            variant='outlined'
                            margin='normal'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            required
                            error={ lastName && lastName.length > 50 ? true : false }
                        />
                    </div>
                    <div className='employee-form-restaurant-id'>
                        <TextField 
                            label='Restaurant ID'
                            type='text'
                            variant='outlined'
                            margin='normal'
                            value={restaurantId}
                            onChange={e => setRestaurantId(e.target.value)}
                            required
                            error={ restaurantId && restaurantId.length > 10 ? true : false }
                        />
                    </div>
                    <div className='employee-form-role'>
                        <label>
                            Role (select all that apply)
                        </label>
                    </div>
                    <div className='employee-form-food-permit-exp'>
                        <Input 
                            label='Food Permit Expiration'
                            type='date'
                            margin='normal'
                            value={foodPermitExp}
                            onChange={e => setFoodPermitExp(e.target.value)}
                        />
                    </div>
                    <div className='employee-form-alcohol-permit-exp'>
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