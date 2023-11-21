import { Box } from "@mui/material";
import React from "react";
import { Chart } from 'react-google-charts';

function DashboardItem5({ roles }) {

    // FUTURE IMPLEMENTATION: have backend include is_former_employee data so employees who are former employee will not be included in pie chart
    const data = roles.map(role => [role.role, role.employees.length]);
    data.unshift(["Employee Role", "Number of Employees"]);

    const options = {
        title: "Employees for Each Role"
    }

    return (
        <Box
            sx={{
                p: 8,
            }}
        >
            <Box sx={{ 
                color: 'text.secondary', 
                display: 'inline',
                fontWeight: 'bold',
                mx: 0.5,
                fontSize: 24,
                }}
            >
                Employees for Each Role
            </Box>
            <Chart 
                chartType="PieChart"
                data={data}
                width={"850px"}
                height={"250px"}
            />
        </Box>)
}

export default DashboardItem5;