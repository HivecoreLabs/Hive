import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEmployees } from "../../contexts/EmployeesContext";

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
    console.log(sortedEmp);

    return (
        <div className='view-all-employees-container'>
            Hello from View All Employees Page!
            <div className='view-all-employees-employees'>
                <ul>
                    {
                        sortedEmp
                        .map(e => (
                            <NavLink to={`/employees/${e.id}`} key={e.id}>
                                <li
                                key={`employee#${e.id}`}
                                >
                                    {`${e.last_name}, ${e.first_name}`}
                                </li>
                            </NavLink>
                        ))
                    }
                </ul>
            </div>
        </div>
    );

}

export default ViewAllEmployees;
