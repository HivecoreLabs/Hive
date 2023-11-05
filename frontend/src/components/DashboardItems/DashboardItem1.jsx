import { Box } from "@mui/material";
import React from "react";
import { Theme, useTheme } from "@mui/material";

function DashboardItem1({ supportStaff }) {

    const theme = useTheme();
    const numActiveEmployees = supportStaff
                                .filter(s => {
                                    let date = new Date();
                                    let today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                                    return Date.parse(today) === Date.parse(s.date) && !s.time_out;
                                })
                                .length;

    return (
        <Box
            sx={{
                // bgcolor: 'canvas',
                // boxShadow: 1,
                // borderRadius: 2,
                p: 2,
                // minWidth: 300,
            }}
        >
            <Box sx={{ color: 'text.secondary' }}>Active Employees</Box>
            <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                {numActiveEmployees}
            </Box>
        </Box>)
}

export default DashboardItem1;