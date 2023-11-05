import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

function DashboardItem5({ roles }) {

    const theme = useTheme();

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
            <PieChart 
                series={[
                    {
                      data,
                      cx: 150
                    },
                  ]}
                  width={950}
                  height={150}
                 
            /> 
        </Box>)
}

export default DashboardItem5;