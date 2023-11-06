import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";

function DashboardItem4({ checkouts, date }) {

    const theme = useTheme();

    const isTodayorYesterday = (d) => {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        return Date.parse(d) === Date.parse(date) || Date.parse(d) === Date.parse(yesterday);
    }

    const netTotal = checkouts.reduce(
        (acc, curr) => isTodayorYesterday(curr.date) ? acc + +curr.net_sales : acc, 0
    );

    return (
        <Box
            sx={{
                // bgcolor: theme.palette.tertiary.main,
                // boxShadow: 1,
                p: 3,
                // minWidth: 300,
            }}
        >
            <Box sx={{ color: theme.isAMShift ? 'text.secondary' : 'white' }}>Net Sales since Yesterday</Box>
            <Box sx={{ color: theme.isAMShift ? 'text.secondary' : 'white', fontSize: 34, fontWeight: 'medium' }}>

            </Box>
            <Box
                theme={theme}

                sx={{
                    color: theme.isAMShift ? 'primary' : 'white',
                    display: 'inline',
                    fontWeight: 'bold',
                    mx: 0.5,
                    fontSize: 34,
                }}
            >
                {netTotal}
            </Box>
        </Box>)
}

export default DashboardItem4;