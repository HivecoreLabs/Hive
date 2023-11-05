import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { css } from '@emotion/react';
import { useEmployees } from "../../contexts/EmployeesContext.js";
import EmployeeCard from './EmployeeCard.jsx';
import RoleCard from './RoleCard.jsx';
import './index.css';

function ViewAllPages({ formType, items }) {


    return (
        <div className='view-all-container'>
            <div
            className='view-all-header'
            >
                <h1>
                    View All {formType}
                </h1>
            </div>
            <ul className='view-all-items'>
                <li>
                    <div className='view-all-items-header'>
                        {
                            formType === 'Employees' ? (
                                <>
                                
                                    <div className='employee-card-last-name'>
                                        <p>
                                            Last Name
                                        </p>
                                    </div>
                                    <div className='employee-card-first-name'>
                                        <p>
                                            First Name
                                        </p>
                                    </div>
                                    <div className='employee-card-employee-id'>
                                        <p>
                                            Employee ID
                                        </p>
                                    </div>
                                    <div className='employee-card-action'>
                                        <p>
                                            Action
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='role-card-role'>
                                        <p>
                                            Role Name
                                        </p>
                                    </div>
                                    <div className='role-card-action'>
                                        <p>
                                            Actions
                                        </p>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </li>
                {
                    items.map(i => {
                        if (formType === "Employees") return (<EmployeeCard employee={i} />);
                        if (formType === "Roles") return (<RoleCard role={i} />)
                    })
                }
            </ul>
        </div>
    );

}

export default ViewAllPages;
