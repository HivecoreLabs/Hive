import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { css } from '@emotion/react';
import { useEmployees } from "../../contexts/EmployeesContext";
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
            Hello from View All Employees Page!
            <div className='view-all-employees-employees'>
                <ul>
                    {
                        sortedEmp
                        .map(e => (
                            <li
                            key={e.id}
                            className='view-all-employees-employee'
                            >
                                <div>
                                    {e.last_name}
                                </div>
                                <div>
                                    {e.first_name}
                                </div>
                                <div>
                                    {e.employee_id}
                                </div>
                                <div>
                                    <NavLink to={`/employees/${e.id}`}>
                                        <Button>Edit</Button>
                                    </NavLink>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );

}

export default ViewAllEmployees;
