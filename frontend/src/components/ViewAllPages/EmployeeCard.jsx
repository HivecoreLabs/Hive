import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, useTheme } from '@mui/material';
import './EmployeeCard.css';

export default function EmployeeCard({ employee, date }){

    const theme = useTheme();
    const [hover, setHover] = useState(false);

    const isMonthFromExpiring = (d) => {
        if (!d) return;
        let oneMonthFromExpire = new Date(d);
        oneMonthFromExpire.setMonth(oneMonthFromExpire.getMonth() - 1);
        return Date.parse(oneMonthFromExpire) < Date.parse(date);
    }

    const isExpired = (d) => {
        if (!d) return;
        return Date.parse(d) < Date.parse(date);
    }

    return (
        <div 
            key={`view-all-employees-${employee.id}`} 
            className='employee-card-container'
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
            <div className='employee-card-food-permit'>
                <p
                    id={ isExpired(employee.food_permit_exp) ? "expired" : isMonthFromExpiring(employee.food_permit_exp) ? "expiring" : "null" }
                >
                    {employee.food_permit_exp || "N/A"}
                </p>
            </div>
            <div className='employee-card-alcohol-permit'>
                <p
                    id={ isExpired(employee.alcohol_permit_exp) ? "expired" : isMonthFromExpiring(employee.alcohol_permit_exp) ? "expiring" : "null" }
                >
                    {employee.alcohol_permit_exp || "N/A"}
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