import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, useTheme } from '@mui/material';
import './EmployeeCard.css';

export default function EmployeeCard({ employee }){

    const theme = useTheme();
    const [hover, setHover] = useState(false);

    return (
        <div key={`view-all-employees-${employee.id}`} className='employee-card-container'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={hover ? { borderColor: theme.palette.secondary.main,
        boxShadow: `5px 2px 2px ${theme.palette.secondary.main}` } : { borderColor: '#777', boxShadow: 'none' }}
        >
            <div className='employee-card-last-name'>
                <p>
                    {employee.last_name}
                </p>
            </div>
            <div className='employee-card-first-name'>
                <p>
                    {employee.first_name}
                </p>
            </div>
            <div className='employee-card-employee-id'>
                <p>
                    {employee.restaurant_employee_id}
                </p>
            </div>
            <div className='employee-card-action'>
                <NavLink to={`/employees/${employee.id}`}>
                    <Button>
                        Edit
                    </Button>
                </NavLink>
            </div>
        </div>
    );

}