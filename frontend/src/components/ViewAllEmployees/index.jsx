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

    console.log(sortedEmp)

    return (
        <div className='view-all-employees-container'>
            <div
            className='view-all-employees-header'
            >
                <h1>
                    View All Employees
                </h1>
            </div>
            <div className='view-all-employees-employees'>
                        <div
                        className='view-all-employees-employee-last-name view-all-employees-employee-header'
                        >
                            Last Name
                        </div>
                        <div
                        className='view-all-employees-employee-first-name view-all-employees-employee-header'
                        >
                            First Name
                        </div>
                        <div
                        className='view-all-employees-employee-employee-id view-all-employees-employee-header'
                        >
                            Employee ID
                        </div>
                        <div
                        className='view-all-employees-employee-action view-all-employees-employee-header'
                        >
                            Action
                        </div>
                    {
                        sortedEmp
                        .map(e => (
                            <>
                                <div
                                className='view-all-employees-employee-last-name'
                                >
                                    {e.last_name}
                                </div>
                                <div
                                className='view-all-employees-employee-first-name'
                                >
                                    {e.first_name}
                                </div>
                                <div
                                className='view-all-employees-employee-employee-id'
                                >
                                    {e.restaurant_employee_id
}
                                </div>
                                <div
                                className='view-all-employees-employee-action'
                                >
                                    <NavLink to={`/employees/${e.id}`}>
                                        <Button>Edit</Button>
                                    </NavLink>
                                </div>
                            </>
                        ))
                    }
            </div>
        </div>
    );

}

export default ViewAllEmployees;
