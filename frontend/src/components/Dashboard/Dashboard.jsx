import "./Dashboard.css";
import React, { useEffect } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from "@mui/material";
import { css } from '@emotion/react';
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardItem1 from "../DashboardItems/DashboardItem1.jsx";
import DashboardItem2 from "../DashboardItems/DashboardItem2.jsx";
import DashboardItem3 from "../DashboardItems/DashboardItem3.jsx";
import DashboardItem4 from "../DashboardItems/DashboardItem4.jsx";
import DashboardItem5 from "../DashboardItems/DashboardItem5.jsx";
import DashboardItem6 from "../DashboardItems/DashboardItem6.jsx";
import DashboardItem7 from "../DashboardItems/DashboardItem7.jsx";
import DashboardItem8 from "../DashboardItems/DashboardItem8.jsx";
import DashboardItem9 from "../DashboardItems/DashboardItem9.jsx";
import { useRoles } from "../../contexts/RolesContext.js";
import { useSupportStaffContext } from "../../contexts/SupportStaffContext.js";
import { useCheckoutsContext } from "../../contexts/CheckoutsContext.js";
import { useDateContext } from "../../contexts/DateContext.js";

const Dashboard = () => {
    const theme = useTheme();

    const gridStyle = css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100px',
        marginLeft: '5px'
    })

    const {
        roles,
        readAllRoles,
        clearRolesState
    } = useRoles();
    const {
        supportStaff,
        fetchAllSupportStaffClockIns,
        clearSupportStaff
    } = useSupportStaffContext();
    const {
        checkouts,
        fetchAllCheckouts,
        clearCheckouts
    } = useCheckoutsContext();
    const {
        stateDate
    } = useDateContext();

    useEffect(() => {
        readAllRoles();
        fetchAllSupportStaffClockIns();
        fetchAllCheckouts();
    }, [useRoles, useSupportStaffContext, useCheckoutsContext]);

    let check = !Object.values(roles)[0]
        || !Object.values(supportStaff)[0]
        || !Object.values(checkouts)[0];

    if (check) return null;


    return (
        <div className="dashboard-container">
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto', marginRight: 'auto', width: '1200px' }} >
                <Grid container rowSpacing={4} columnSpacing={3} sx={gridStyle} >
                    {/* first row */}
                    <Grid item sx={{ width: '300px' }}>
                        <Paper elevation={2} sx={{ borderRadius: 2, bgcolor: theme.palette.canvas }}>
                            <DashboardItem1 supportStaff={supportStaff}></DashboardItem1>
                        </Paper>
                    </Grid>
                    <Grid item sx={{ width: '300px' }}>
                        <Paper elevation={2} sx={{ borderRadius: 2, bgcolor: theme.palette.tertiary.main }}>
                            <DashboardItem2 checkouts={checkouts}></DashboardItem2>
                        </Paper>
                    </Grid>
                    <Grid item sx={{ width: '300px' }}>
                        <Paper elevation={2} sx={{ borderRadius: 2, bgcolor: theme.palette.secondary.main, padding: '5px' }}>
                            <DashboardItem3></DashboardItem3>
                        </Paper>
                    </Grid>
                    <Grid item sx={{ width: '300px' }}>
                        <Paper elevation={2} sx={{ borderRadius: 2, bgcolor: theme.palette.tertiary.main }}>
                            <DashboardItem4 checkouts={checkouts} date={stateDate}></DashboardItem4>
                        </Paper>
                    </Grid>

                    {/* second row */}
                    <Grid item sx={{ width: '1000px' }}>
                        <Paper elevation={2}><DashboardItem5 roles={roles}></DashboardItem5></Paper>
                    </Grid>
                    {/* third row */}
                </Grid>
            </Box >
        </div>
    )
};

export default Dashboard;