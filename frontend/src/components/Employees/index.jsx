import React from "react";
import { Button } from "@mui/material";
import { useEmployees } from "../../contexts/EmployeesContext";
import { useRoles } from "../../contexts/RolesContext";

function Employee() {

    const { 
        employee,
        employees,
        createEmployee,
        readSingleEmployee,
        readAllEmployees,
        updateEmployee
     } = useEmployees();

     const {
        role,
        roles,
        createRole,
        readSingleRole,
        readAllRoles,
        updateRole
     } = useRoles();

    const test = (e) => {

        e.preventDefault();

        const res = readSingleEmployee(1);

        console.log(res);

    }

    return (
        <>
            <h1>Testing dispatch functions</h1>
            <Button onClick={test}>
                TEST
            </Button>
        </>
    );

}

export default Employee;