import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, useTheme } from '@mui/material';
import './RoleCard.css';

export default function EmployeeCard({ role }){

    const theme = useTheme();
    const [hover, setHover] = useState(false);

    return (
        <div key={role.id} className='role-card-container'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={hover ? { borderColor: theme.palette.secondary.main,
        boxShadow: `5px 2px 2px ${theme.palette.secondary.main}` } : { borderColor: '#777', boxShadow: 'none' }}
        >
            <div className='role-card-role'>
                <p>
                    {role.role}
                </p>
            </div>
            <div className='role-card-action'>
                <NavLink to={`/roles/${role.id}`}>
                    <Button>
                        Details
                    </Button>
                </NavLink>
            </div>
        </div>
    );
}