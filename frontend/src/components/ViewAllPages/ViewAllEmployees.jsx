import React, { useEffect } from 'react';
import { useEmployees } from '../../contexts/EmployeesContext.js';
import ViewAllPages from "./index.jsx";

export default function ViewAllEmployees() {

    const {
        employees,
        readAllEmployees,
        resetEmployee
    } = useEmployees();

    useEffect(() => {
        readAllEmployees();
        resetEmployee();
    }, [useEmployees]);

    if (!employees[0]) return null;
    const sortedEmp = employees.sort((a, b) => {
        const lastNameA = a.last_name.toUpperCase();
        const lastNameB = b.last_name.toUpperCase();
        const firstNameA = a.first_name.toUpperCase();
        const firstNameB = b.first_name.toUpperCase();

        return lastNameA < lastNameB ? -1 : lastNameA > lastNameB ? 1 : firstNameA < firstNameB ? -1 : firstNameA > firstNameB ? 1 : 0;
    });

    return (
        <ViewAllPages formType={'Employees'} items={sortedEmp} />
    );

}