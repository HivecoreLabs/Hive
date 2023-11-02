import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../../contexts/EmployeesContext';
import { useRoles } from '../../contexts/RolesContext';
import { Button, Input, TextField } from '@mui/material';
import './index.css';

export default function EmployeeForm({ employee, formType }) {

    const {
        createEmployee,
        updateEmployee
    } = useEmployees();
    const {
        roles,
        readAllRoles
    } = useRoles();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        readAllRoles();
    }, [useRoles]);

    console.log(roles);

    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [restaurantId, setRestaurantId] = useState(employee.restaurantId);
    const [role, setRole] = useState([...employee.role]);
    const [foodPermitExp, setFoodPermitExp] = useState(employee.foodPermitExp);
    const [alcoholPermitExp, setAlcoholPermitExp] = useState(employee.alcoholPermitExp);
    const [formerEmployee, setFormerEmployee] = useState(employee.formerEmployee);


    const handleSubmit = async (e) => {

        e.preventDefault();

        let emp = {
            first_name: firstName,
            last_name: lastName,
            restaurant_employee_id: restaurantId,
            roles: role,
            food_permit_exp: foodPermitExp,
            alcohol_permit_exp: alcoholPermitExp
        };
      
        let res;
        if (formType === 'Create') {
            res = createEmployee(emp);
        } else if (formType === 'Edit') {
            
            emp.is_former_employee = formerEmployee;
            res = updateEmployee(id, emp);
            
        }
        
        if (res) return navigate("/employees/all");

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
                        <label>
                            First Name
                        </label>
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
                        <label>
                            Last Name
                        </label>
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
                        <label>
                            Restaurant ID
                        </label>
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
                        <label>
                            Food Permit Expiration
                        </label>
                        <Input 
                            label='Food Permit Expiration'
                            type='date'
                            margin='normal'
                            value={foodPermitExp}
                            onChange={e => setFoodPermitExp(e.target.value)}
                        />
                    </div>
                    <div className='employee-form-alcohol-permit-exp'>
                        <label>
                            Alcohol Permit Expiration
                        </label>
                        <Input 
                            label='Alcohol Permit Expiration'
                            type='date'
                            margin='normal'
                            value={alcoholPermitExp}
                            onChange={e => setAlcoholPermitExp(e.target.value)}
                        />
                    </div>
                    { formType === 'Edit' ? (
                        <div className='employee-form-is-former-employee'>
                            <label>
                                Former Employee?
                            </label>
                            <Input 
                                type='checkbox'
                                margin='normal'
                                value={formerEmployee}
                                onChange={e => setFormerEmployee(!formerEmployee)}
                                checked={formerEmployee}
                            />
                        </div>
                    ) : null }
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