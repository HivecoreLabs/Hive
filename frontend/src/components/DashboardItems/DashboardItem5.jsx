import { Box } from "@mui/material";
import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';

function DashboardItem5({ roles }) {

    // FUTURE IMPLEMENTATION: have backend include is_former_employee data so employees who are former employee will not be included in pie chart
    const data = roles.map((role, idx) => ({
        id: idx,
        value: role.employees.length,
        label: role.role
    }));

    return (
        <Box
            sx={{
                // bgcolor: theme.palette.tertiary.main,
                // boxShadow: 1,
                p: 8,
                // minWidth: 300,
            }}
        >
            <Box sx={{ 
                color: 'text.secondary', 
                display: 'inline',
                fontWeight: 'bold',
                mx: 0.5,
                fontSize: 24,
                }}>Employees for Each Role</Box>
            <PieChart 
                series={[
                    {
                      data,
                      cx: 150
                    },
                  ]}
                  width={850}
                  height={150}
                 
            /> 
        </Box>)
}

export default DashboardItem5;