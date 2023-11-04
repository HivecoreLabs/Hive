import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEmployees } from '../../contexts/EmployeesContext.js';
import EmployeeForm from "./index.jsx";

export default function EditEmployeeForm() {

    const {
        employee,
        readSingleEmployee
    } = useEmployees();
    const { id } = useParams();

    useEffect(() => {
        readSingleEmployee(id);
    }, [useEmployees, id]);


    if (!Object.values(employee)[0]) return null;

    const toEdit = {
        firstName: employee.first_name,
        lastName: employee.last_name,
        restaurantId: employee.restaurant_employee_id,
        role: employee.roles || [],
        foodPermitExp: employee.food_permit_exp,
        alcoholPermitExp: employee.alcohol_permit_exp,
        formerEmployee: employee.is_former_employee
    };

    return (
        <EmployeeForm employee={toEdit} formType={'Edit'} />
    );

}