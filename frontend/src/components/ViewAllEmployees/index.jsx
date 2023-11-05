import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEmployees } from "../../contexts/EmployeesContext";

function ViewAllEmployees() {

    const {
        employees,
        readAllEmployees
    } = useEmployees();

    useEffect(() => {
        readAllEmployees();
    }, [useEmployees])

    console.log(employees);

    if (!employees[0]) return null;
    return (
        <div className='view-all-employees-container'>
            Hello from View All Employees Page!
            <div className='view-all-employees-employees'>
                <ul>
                    {
                        employees.map(e => (
                            <NavLink to={`/employees/${e.id}`}>
                                <li
                                key={e.id}
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
