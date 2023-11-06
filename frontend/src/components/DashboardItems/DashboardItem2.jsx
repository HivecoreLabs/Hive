import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";

function DashboardItem2({ checkouts }) {

    const theme = useTheme();
    return (
        <Box
            sx={{
                // bgcolor: theme.palette.secondary.main,
                // boxShadow: 1,
                // borderRadius: 2,
                p: 3,
                // minWidth: 300,
            }}
        >
            <Box sx={{ color: theme.isAMShift ? 'text.secondary' : 'white'  }}>Total Checkouts</Box>
            <Box sx={{ color: theme.isAMShift ? 'text.secondary' : 'white' , fontSize: 34, fontWeight: 'medium' }}>
                {checkouts.length}
            </Box>
        </Box>)
}

export default DashboardItem2;