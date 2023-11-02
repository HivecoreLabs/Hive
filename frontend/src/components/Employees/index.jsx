import "./index.css";
import React from "react";
import { css } from '@emotion/react';
import { Box, Grid, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";

function Employee() {

    const gridStyle = css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100px',
        marginLeft: '5px'
    });

    return (
        <div className="employee-page-container">
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container rowSpacing={1} columnSpacing={2} sx={gridStyle}>
                    <Grid item sx={{width: '300px'}}>
                        <NavLink
                        to="employees/all"
                        >
                            <Paper 
                            elevation={2} 
                            sx={{ borderRadius: 2, bgcolor: 'gray', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
                            >
                                <p style={{ textDecoration: 'none' }}>
                                    View/Edit Employees
                                </p>
                            </Paper>
                        </NavLink>
                    </Grid>
                    <Grid item sx={{width: '300px'}}>
                        <NavLink
                        to="/employees/new"
                        >
                            <Paper 
                            elevation={2} 
                            sx={{ borderRadius: 2, bgcolor: 'gray', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
                            >
                                <p style={{ textDecoration: 'none' }}>
                                    Create New Employee
                                </p>
                            </Paper>
                        </NavLink>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );

}

export default Employee;