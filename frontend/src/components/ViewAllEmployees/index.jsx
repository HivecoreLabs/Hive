import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { css } from '@emotion/react';
import { useEmployees } from "../../contexts/EmployeesContext";
import EmployeeCard from './EmployeeCard.jsx';
import './index.css';

function ViewAllEmployees() {

    const {
        employees,
        readAllEmployees,
        resetEmployee
    } = useEmployees();



    useEffect(() => {
        readAllEmployees();
        resetEmployee();
    }, [useEmployees])

    if (!employees[0]) return null;
    const sortedEmp = employees.sort((a, b) => {
        const lastNameA = a.last_name.toUpperCase();
        const lastNameB = b.last_name.toUpperCase();
        const firstNameA = a.first_name.toUpperCase();
        const firstNameB = b.first_name.toUpperCase();

        return lastNameA < lastNameB ? -1 : lastNameA > lastNameB ? 1 : firstNameA < firstNameB ? -1 : firstNameA > firstNameB ? 1 : 0;
    });

    return (
        <div className='view-all-employees-container'>
            <div
            className='view-all-employees-header'
            >
                <h1>
                    View All Employees
                </h1>
            </div>
            <ul className='view-all-employees-employees'>
                <li>
                    <div className='view-all-employees-employees-header'>
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
                    </div>
                </li>
                {
                    sortedEmp.map(e => (
                        <EmployeeCard employee={e} />
                    ))
                }
            </ul>
        </div>
    );

}

export default ViewAllEmployees;
