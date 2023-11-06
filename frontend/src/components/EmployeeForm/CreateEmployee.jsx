import EmployeeForm from "./index.jsx";
import React from "react";

export default function CreateEmployeeForm() {

    const employee = {
        firstName: '',
        lastName: '',
        restaurantId: '',
        role: [],
        foodPermitExp: null,
        alcoholPermitExp: null,
        formerEmployee: false
    };

    return (
        <EmployeeForm employee={employee} formType={'Create'} />
    );

}