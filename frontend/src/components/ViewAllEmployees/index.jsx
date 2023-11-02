import React, { useEffect, useState } from 'react';
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

    return (
        <div className='view-all-employees-container'>
            Hello from View All Employees Page!
        </div>
    );

}

export default ViewAllEmployees;
