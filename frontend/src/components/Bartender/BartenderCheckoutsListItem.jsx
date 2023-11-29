import React, { useState, useEffect } from 'react';
import {
    AccordionDetails,
    Typography,
    Accordion,
    AccordionSummary,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { useEmployees } from '../../contexts/EmployeesContext';
import { useCheckoutsContext } from '../../contexts/CheckoutsContext';
import { useTheme } from "@mui/material";
import { useRoles } from '../../contexts/RolesContext';

const BartenderCheckoutsListItem = ({ checkout }) => {
    const theme = useTheme();
    const { rolesOptions, readAllRoles } = useRoles();
    const { checkoutObject, id, firstName, lastName } = checkout;
    const date = checkoutObject.date;
    const checkoutBreakdown = checkoutObject?.breakdown;
    const [expanded, setExpanded] = useState(null);

    const handleExpand = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    useEffect(() => {
        readAllRoles()
    }, [])
    return (
        <Accordion
            key={id}
            expanded={expanded === `panel-${id}`}
            onChange={handleExpand(`panel-${id}`)}
            elevation={3}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '110%' }}>
                    <Typography sx={{ width: '40%', color: expanded === `panel-${id}` ? theme.palette.secondary.dark : '', }} >{firstName} {lastName}</Typography>
                    <Typography sx={{ width: '40%' }}>
                        {dayjs(date).format('dddd, MMM D')}
                    </Typography>
                    {/* <Typography>
                        {dayjs(checkout.created_at).format('h:mm A')}
                    </Typography> */}
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <TableContainer elevation={4} component={Paper} style={{ width: '43%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Net Sales</TableCell>
                                    <TableCell>Cash Owed</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>$ {checkoutObject.net_sales}</TableCell>
                                    <TableCell>$ {checkoutObject.cash_owed}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer elevation={4} component={Paper} style={{ width: '55%' }}>
                        <Table>
                            <TableHead >
                                <TableRow>
                                    <TableCell>Tipout Breakdowns</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {/* <TableRow>
                                    <TableCell>Tipout Breakdowns</TableCell>
                                    <TableCell></TableCell>
                                </TableRow> */}
                                {checkoutBreakdown?.map((breakdown) => {
                                    const roleName = rolesOptions[breakdown.role_id];
                                    return (
                                        <TableRow key={breakdown.id}>
                                            <TableCell sx={{ width: '53%' }}>$ {breakdown.total}</TableCell>
                                            <TableCell sx={{ width: '47%' }}>{roleName}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default BartenderCheckoutsListItem;