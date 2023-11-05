// import React, { useContext, useEffect } from 'react';
// import { Accordion, AccordionSummary, AccordionDetails, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import dayjs from 'dayjs';
// import { useDateContext } from '../../contexts/DateContext';
// import { useCheckoutsContext } from '../../contexts/CheckoutsContext';
// import './SupportStaffList.css';

// const CheckoutsList = () => {
//     const { stateDate } = useDateContext();
//     const {checkouts, fetchAllCheckouts} = useCheckoutsContext();

//     const [checkoutsList, setCheckoutsList] = useState(checkouts);

//     useEffect(() => {
//         const formattedDate = stateDate.format('YYYY-MM-DD');
//         fetchAllCheckouts(formattedDate);
//     }, [stateDate]);

//     useEffect(() => {
//         setCheckoutsList(checkouts)
//     }, [checkouts])

//     return (
//         <div className='checkouts-list-container'>
//             {checkoutsList.length > 0 ? (
//                 checkoutsList.map((checkout) => (
//                     <Accordion key={checkout.id}>
//                         <AccordionSummary>
//                             <Typography>Server: {checkout.employee_id}</Typography>
//                             <Typography>Checkout Time: {dayjs(checkout.created_at).format('YYYY-MM-DD HH:mm:ss')}</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             {/* Additional details about the checkout */}
//                             {/* You can expand this section to include more information */}
//                         </AccordionDetails>
//                     </Accordion>
//                 ))
//             ) : (
//                 <Typography>No checkouts available for this date.</Typography>
//             )}
//         </div>
//     );
// }

// export default CheckoutsList;


// import React, { useContext, useEffect, useState } from 'react';
// import { Accordion, AccordionSummary, AccordionDetails, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import dayjs from 'dayjs';
// import { useDateContext } from '../../contexts/DateContext';
// import { useCheckoutsContext } from '../../contexts/CheckoutsContext';

// const CheckoutsList = () => {
//     const { stateDate } = useDateContext();
//     const { checkouts, fetchAllCheckouts } = useCheckoutsContext();

//     const [checkoutsList, setCheckoutsList] = useState(checkouts);

//     useEffect(() => {
//         const formattedDate = stateDate.format('YYYY-MM-DD');
//         fetchAllCheckouts(formattedDate);
//     }, [stateDate]);

//     useEffect(() => {
//         setCheckoutsList(checkouts);
//     }, [checkouts]);

//     return (
//         <div className='checkouts-list-container'>
//             {checkoutsList.length > 0 ? (
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Server</TableCell>
//                                 <TableCell>Checkout Date</TableCell>
//                                 <TableCell>Checkout Time</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {checkoutsList.map((checkout) => (
//                                 <Accordion key={checkout.id}>
//                                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                                         <TableCell>{checkout.employee_id}</TableCell>
//                                         <TableCell>{dayjs(checkout.date).format('dddd, MMM D')}</TableCell>
//                                         <TableCell>{dayjs(checkout.created_at).format('HH:mm:ss')}</TableCell>
//                                     </AccordionSummary>
//                                     <AccordionDetails>
//                                         {/* Additional details about the checkout */}
//                                         {/* You can expand this section to include more information */}
//                                     </AccordionDetails>
//                                 </Accordion>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             ) : (
//                 <Typography>No checkouts available for this date.</Typography>
//             )}
//         </div>
//     );
// }

// export default CheckoutsList;

import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { useDateContext } from '../../contexts/DateContext';
import { useCheckoutsContext } from '../../contexts/CheckoutsContext';

export default function CheckoutsList() {
    const { stateDate } = useDateContext();
    const { checkouts, fetchAllCheckouts } = useCheckoutsContext();
    debugger

    const [checkoutsList, setCheckoutsList] = useState(checkouts);

    const [expanded, setExpanded] = useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    useEffect(() => {
        const formattedDate = stateDate.format('YYYY-MM-DD');
        fetchAllCheckouts(formattedDate);
    }, [stateDate])

    useEffect(() => {
        setCheckoutsList(checkouts)
    }, [checkouts])

    console.log(checkouts);

    return (
        <div>
            {checkouts.map((checkout) => (
                <Accordion
                    key={checkout.checkout.id}
                    expanded={expanded === `panel-${checkout.checkout.id}`}
                    onChange={handleChange(`panel-${checkout.checkout.id}`)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                            <Typography sx={{ width: '50px' }}>{checkout.checkout.employee_id}</Typography>
                            <Typography>
                                {dayjs(checkout.checkout.date).format('dddd, MMM D')}
                            </Typography>
                            <Typography>
                                {dayjs(checkout.checkout.created_at).format('h:mm A')}
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* Additional details about the checkout */}
                        {/* You can expand this section to include more information */}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
