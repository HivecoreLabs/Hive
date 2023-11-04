import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Grid, Paper } from '@mui/material';
import { css } from '@emotion/react';
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

    return (
        <div className='view-all-employees-container'>
            Hello from View All Employees Page!
            <Box className='view-all-employees-employees'>
                <Grid container columnSpacing={4}>
                    <Grid item>
                        Last Name
                    </Grid>
                    <Grid item>
                        First Name
                    </Grid>
                    <Grid item>
                        Employee ID
                    </Grid>
                    <Grid item>
                        Action
                    </Grid>
                    {
                        sortedEmp
                        .map(e => (
                            <>
                                <Grid item>
                                    {e.last_name}
                                </Grid>
                                <Grid item>
                                    {e.first_name}
                                </Grid>
                                <Grid item>
                                    {e.employee_id}
                                </Grid>
                                <Grid item>
                                    <NavLink to={`/employees/${e.id}`}>
                                        Edit
                                    </NavLink>
                                </Grid>
                            </>  
                        ))
                    }
                </Grid>
            </Box>
        </div>
    );

}

export default ViewAllEmployees;
