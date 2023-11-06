import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import { Paper } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { useDateContext } from '../../contexts/DateContext';
import { useCheckoutsContext } from '../../contexts/CheckoutsContext';
import { useEmployees } from '../../contexts/EmployeesContext';
import CheckoutsListItem from './CheckoutsListItem.jsx';
import { theme } from '../../contexts/ThemeContext';
import { useRoles } from '../../contexts/RolesContext';

export const CheckoutsList = () => {
    const { stateDate } = useDateContext();
    const { checkouts, fetchAllCheckouts } = useCheckoutsContext();
    const { employees, readAllEmployees } = useEmployees();

    const [checkoutsList, setCheckoutsList] = useState(checkouts);

    const checkoutsAM = checkoutsList.length > 0 ? checkoutsList.filter((checkout) => checkout.is_am_shift) : null;
    const checkoutsPM = checkoutsList.length > 0 ? checkoutsList.filter((checkout) => !checkout.is_am_shift) : null;

    const checkoutsAMList = checkoutsAM ? checkoutsAM?.map((checkout) => {
        const employee = employees.find((employee) => checkout.employee_id === employee.id);
        const value = {
            checkoutObject: checkout,
            id: employee.id,
            firstName: employee.first_name,
            lastName: employee.last_name
        }
        return (
            <CheckoutsListItem key={checkout.id} checkout={value} />
        )
    }) : <Typography variant='h9' sx={{ textAlign: 'center', display: 'inline-block', width: '100%' }} color={theme.palette.primary.light}>no AM servers have checked out yet</Typography>

    const checkoutsPMList = checkoutsPM ? checkoutsPM?.map((checkout) => {
        const employee = employees.find((employee) => checkout.employee_id === employee.id);
        const value = {
            checkoutObject: checkout,
            id: employee.id,
            firstName: employee.first_name,
            lastName: employee.last_name
        }
        return (
            <CheckoutsListItem key={checkout.id} checkout={value} />
        )
    }) : <Typography variant='h9' sx={{ textAlign: 'center', display: 'inline-block', width: '100%' }} color={theme.palette.primary.light}>no PM servers have checked out yet</Typography>

    useEffect(() => {
        const formattedDate = stateDate.format('YYYY-MM-DD');
        fetchAllCheckouts(formattedDate);
    }, [stateDate])

    useEffect(() => {
        setCheckoutsList(checkouts)
    }, [checkouts])

    useEffect(() => {
        readAllEmployees();
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
            <Paper sx={{ borderRadius: '8px', padding: '10px', paddingBottom: '15px', paddingTop: '10px', marginBottom: '25px' }}>
                <Typography sx={{ paddingBottom: '10px' }} variant="h6" textAlign='center'>AM Shift Checkouts</Typography>
                {checkoutsAMList}
            </Paper>
            <Paper sx={{ borderRadius: '8px', padding: '10px', paddingBottom: '15px', paddingTop: '10px', marginBottom: '10px' }}>
                <Typography sx={{ paddingBottom: '10px' }} variant="h6" textAlign='center'>PM Shift Checkouts</Typography>
                {checkoutsPMList}
            </Paper>
        </div>
    );
};

export default CheckoutsList;
