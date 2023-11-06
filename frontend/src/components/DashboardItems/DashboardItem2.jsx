import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";

function DashboardItem2({ supportStaff }) {

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
            <Box sx={{ color: 'text.secondary' }}>Total Checkouts</Box>
            <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
                {supportStaff.length}
            </Box>
        </Box>)
}

export default DashboardItem2;