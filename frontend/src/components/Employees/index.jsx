import React from "react";
import { Button } from "@mui/material";
import { useEmployees } from "../../contexts/EmployeesContext";

function Employee() {

    const { 
        employee,
        employees,
        createEmployee,
        readSingleEmployee,
        readAllEmployees,
        updateEmployee,
        deleteEmployee
     } = useEmployees();

    const test = (e) => {

        e.preventDefault();

        const res = deleteEmployee(11);

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