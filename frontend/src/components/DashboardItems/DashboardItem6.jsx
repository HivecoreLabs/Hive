import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";

function DashboardItem6() {

    const theme = useTheme();
    return (
        <Box
            sx={{
                // bgcolor: theme.palette.tertiary.main,
                // boxShadow: 1,
                p: 8,
                // minWidth: 300,
            }}
        >
            <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
            <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                98.3 K
            </Box>
            <Box
                theme={theme}

                sx={{
                    color: 'primary',
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

export default DashboardItem6;