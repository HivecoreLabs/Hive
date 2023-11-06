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

const CheckoutsListItem = ({ checkout }) => {
    const theme = useTheme();
    const { checkoutObject, id, firstName, lastName } = checkout;
    const date = checkoutObject.date;
    const checkoutBreakdowns = checkoutObject.checkout_tipout_breakdowns;
    const { employee, readAllEmployees, readSingleEmployee } = useEmployees();
    const [expanded, setExpanded] = useState(null);

    const handleExpand = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

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
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                    <Typography sx={{ width: '40%' }} >{firstName} {lastName}</Typography>
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
                    <TableContainer elevation={4} component={Paper} style={{ width: '48%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Net Sales</TableCell>
                                    <TableCell>Cash Owed</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{checkoutObject.net_sales}</TableCell>
                                    <TableCell>{checkoutObject.cash_owed}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer elevation={4} component={Paper} style={{ width: '48%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: '100%' }}>Tipout Breakdowns</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {checkoutBreakdowns.map((breakdown) => (
                                    <TableRow key={breakdown.id}>
                                        <TableCell>{breakdown.total}</TableCell>
                                        <TableCell>{breakdown.role_id}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default CheckoutsListItem;