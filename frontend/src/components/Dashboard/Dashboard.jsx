import "./Dashboard.css";
import React from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTheme } from "@mui/material";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import DashboardItem1 from "../DashboardItems/DashboardItem1.jsx";
import DashboardItem2 from "../DashboardItems/DashboardItem2.jsx";
import DashboardItem3 from "../DashboardItems/DashboardItem3.jsx";
import DashboardItem4 from "../DashboardItems/DashboardItem4.jsx";

function Dashboard() {
    const theme = useTheme();
    return (
        <div className="dashboard-container">
            <Box>
                {/* display='flex' flexDirection='column' justifyContent='center' textAlign='center'  */}
                <Grid container spacing={2} >

                    {/* first row */}
                    <Grid item sx={{ width: '220px' }}>
                        <Paper elevation={2} sx={{ borderRadius: 2, bgcolor: theme.palette.canvas }}>
                            <DashboardItem1></DashboardItem1>
                        </Paper>
                    </Grid>
                    <Grid item sx={{ width: '220px' }}>
                        <Paper elevation={2} sx={{ borderRadius: 2, bgcolor: theme.palette.tertiary.main }}>
                            <DashboardItem2></DashboardItem2>
                        </Paper>
                    </Grid>
                    <Grid item sx={{ width: '220px' }}>
                        <Paper elevation={2} sx={{ borderRadius: 2, bgcolor: theme.palette.secondary.main }}>
                            <DashboardItem3></DashboardItem3>
                        </Paper>
                    </Grid>
                    <Grid item sx={{ width: '220px' }}>
                        <Paper elevation={2} sx={{ borderRadius: 2, bgcolor: theme.palette.quaternary.main }}>
                            <DashboardItem4></DashboardItem4>
                        </Paper>
                    </Grid>

                    {/* second row */}
                    <Grid item sx={{ width: '400px' }} bgcolor='primary'>
                        <Paper elevation={2}>1</Paper>
                    </Grid>
                    <Grid item sx={{ width: '200px' }}>
                        <Paper elevation={2}>2</Paper>
                    </Grid>
                    <Grid item sx={{ width: '200px' }}>
                        <Paper elevation={2}>3</Paper>
                    </Grid>
                    {/* third row */}
                    <Grid item sx={{ width: '400px' }}>
                        <Paper elevation={2}>1</Paper>
                    </Grid>
                    <Grid item sx={{ width: '400px' }}>
                        <Paper elevation={2}>2</Paper>
                    </Grid>
                </Grid>
                <NavLink to='/' style={{ width: '100px', margin: 'auto' }}>
                    <Button variant="contained">Home</Button>
                </NavLink>
            </Box >
        </div>
    )
};

export default Dashboard;