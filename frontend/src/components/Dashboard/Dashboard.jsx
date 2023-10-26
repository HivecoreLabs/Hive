import React from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    return (
        <Box display='flex' flexDirection='column' textAlign='center' ml={8} >
            <Grid container spacing={2} p={15}>

                {/* first row */}
                <Grid item sx={{ width: '200px' }}>
                    <Paper elevation={2}>1</Paper>
                </Grid>
                <Grid item sx={{ width: '200px' }}>
                    <Paper elevation={2}>2</Paper>
                </Grid>
                <Grid item sx={{ width: '200px' }}>
                    <Paper elevation={2}>3</Paper>
                </Grid>
                <Grid item sx={{ width: '200px' }}>
                    <Paper elevation={2}>4</Paper>
                </Grid>

                {/* second row */}
                <Grid item sx={{ width: '400px' }}>
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
        </Box>
    )
};

export default Dashboard;