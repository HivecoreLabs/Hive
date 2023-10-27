import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";

function DashboardItem2() {

    const theme = useTheme();
    return (
        <Box
            sx={{
                // bgcolor: theme.palette.secondary.main,
                // boxShadow: 1,
                // borderRadius: 2,
                p: 2,
                // minWidth: 300,
            }}
        >
            <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
            <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                98.3 K
            </Box>
            <Box
                sx={{
                    color: 'tertiary',
                    display: 'inline',
                    fontWeight: 'bold',
                    mx: 0.5,
                    fontSize: 14,
                }}
            >
                +18.77%
            </Box>
            <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
                vs. last week
            </Box>
        </Box>)
}

export default DashboardItem2;