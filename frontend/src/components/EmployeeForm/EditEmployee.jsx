import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { readSingleEmployee, useEmployees, useEmployeesDispatch } from '../../contexts/EmployeesContext.js';
import EmployeeForm from "./index.jsx";

export default function EditEmployeeForm() {

    const dispatch = useEmployeesDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(
            readSingleEmployee(id)
        );
    }, [dispatch, id]);

    const toEdit = useEmployees();

    const employee = {
        firstName: toEdit.employee.first_name,
        lastName: toEdit.employee.last_name,
        restaurantId: toEdit.employee.restaurant_employee_id,
        role: toEdit.employee.roles,
        foodPermitExp: toEdit.employee.food_permit_exp,
        alcoholPermitExp: toEdit.employee.alcohol_permit_exp,
        formerEmployee: toEdit.employee.is_former_employee
    };

    return (
        <EmployeeForm employee={employee} formType={'Edit'} />
    );

}