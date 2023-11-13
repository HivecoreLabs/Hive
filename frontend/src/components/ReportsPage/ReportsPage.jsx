import React, { useEffect, useState } from 'react';
import './ReportsPage.css';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { Button, Box, Typography, Paper, IconButton, Modal, Tooltip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Textfield } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { useDateContext } from '../../contexts/DateContext';
import CheckoutsList from '../CheckoutsPage/CheckoutsList.jsx';
import { useCheckoutsContext } from '../../contexts/CheckoutsContext';
import { useSupportStaffContext } from '../../contexts/SupportStaffContext';
import { useModalContext } from '../../contexts/ModalContext';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useTheme } from '@mui/material';
import ModalRoot from '../Modals/ModalRoot.jsx';
import { useEmployees } from '../../contexts/EmployeesContext';
import { useRoles } from '../../contexts/RolesContext';
import { useSummaryContext } from '../../contexts/SummaryContext';

const ReportsPage = () => {
    const theme = useTheme();
    const { stateDate, changeStateDate } = useDateContext();
    const { supportStaff, fetchAllSupportStaffClockInsByDate } = useSupportStaffContext();
    const { checkouts } = useCheckoutsContext();
    const { openModal, closeModal, modalDispatch } = useModalContext();
    const { employees, readAllEmployees } = useEmployees();
    const { roles, readAllRoles } = useRoles();
    const { summary } = useSummaryContext();
    const [supportStaffList, setSupportStaffList] = useState([]);
    const [date, setDate] = useState(stateDate);
    const formattedDate = date.format('dddd, MMM D YYYY');
    const [showDateModal, setShowDateModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [dayFinalized, setDayFinalized] = useState(false);
    const [allClockedOut, setAllClockedOut] = useState(false);

    const findEmployeeNameById = (employeeId) => {
        const employee = employees.find((emp) => emp.id === employeeId);
        return employee ? `${employee.first_name} ${employee.last_name}` : '';
    };

    const findRoleNameById = (roleId) => {
        const role = roles.find((r) => r.id === roleId);
        return role ? role.role : '';
    };

    const summaryTable = summary && summary.am.length > 0 ?
        (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Shift</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Tipout Received</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {summary.am.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.is_am ? 'AM' : 'PM'}</TableCell>
                                <TableCell>{findEmployeeNameById(item.employee_id)}</TableCell>
                                <TableCell>{findRoleNameById(item.active_role_id)}</TableCell>
                                <TableCell>{item.tipout_received}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        ) : null;

    const handleDate = (value) => {
        setDate(value);
    }
    const handleDateChange = () => {
        changeStateDate(date);
        handleCloseDateModal();
    };

    const handleOpenDateModal = () => {
        setShowDateModal(true);
    };
    const handleCloseDateModal = () => {
        setShowDateModal(false);
    };

    const handleOpenReportModal = () => {
        setShowReportModal(true);
    };
    const handleCloseReportModal = () => {
        setShowReportModal(false);
    };

    const handleAllClockedOut = () => {
        setAllClockedOut(true);
    }

    const handleFinalizeDay = () => {
        modalDispatch(openModal('FinalizeDayModal', { dayFinalized, setDayFinalized }));
    }

    const handleGenerateReport = () => {
        handleCloseReportModal();
    };

    useEffect(() => {
        const formattedDate = stateDate.format('YYYY-MM-DD');
        fetchAllSupportStaffClockInsByDate(formattedDate);
    }, [stateDate]);

    useEffect(() => {
        setSupportStaffList(supportStaff);
    }, [supportStaff]);

    useEffect(() => {
        const areAllClockedOut = checkouts.length && supportStaffList?.length > 0 ? supportStaffList.every((support) => support.time_out !== null) : null;

        if (areAllClockedOut) {
            setAllClockedOut(true);
        } else {
            setAllClockedOut(false);
        }
    }, [supportStaffList, date])

    useEffect(() => {
        readAllEmployees();
        readAllRoles();
    }, [])

    return (
        <div className="reports-page-container">
            <Typography variant="h6" mb='20px'>
                Report for: {formattedDate}
                <Button component={Link} variant='outlined' onClick={handleOpenDateModal} style={{ marginLeft: '10px', fontSize: '16px', textDecoration: 'underline', cursor: 'pointer' }}>
                    <Typography color={theme.palette.secondary.dark}>Change Date?</Typography>
                </Button>
            </Typography>
            <div className='checkouts-support-staff-list'>
                <div className='checkouts-on-report-page'>
                    <CheckoutsList />
                </div>
                {/* <ActiveSupportStaffList /> */}
                <Paper sx={{ borderRadius: '8px', padding: '10px', marginLeft: '30px', marginTop: '15px', maxHeight: '500px', overflowY: 'scroll', marginBottom: '10px' }}>
                    <Typography variant="h6" textAlign='center' sx={{ marginBottom: '10px', width: '100%', display: 'inline-block' }}>
                        Active Support Staff
                    </Typography>
                    <TableContainer sx={{ overflowY: 'scroll' }} >
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Shift</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Clocked Out?</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {supportStaffList.map((support) => (
                                    <TableRow key={support.id}>
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                {support.is_am ? (
                                                    <>
                                                        <WbSunnyIcon fontSize="small" sx={{ color: theme.AM }} /> {/* Sun icon */}
                                                        <Typography variant='h7' sx={{ marginLeft: '4px' }}>
                                                            AM
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <>
                                                        <BedtimeIcon fontSize="small" sx={{ color: theme.PM }} /> {/* Moon icon */}
                                                        <Typography variant='h7' sx={{ marginLeft: '4px' }}>
                                                            PM
                                                        </Typography>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {support.employee.first_name} {support.employee.last_name}
                                        </TableCell>
                                        <TableCell>{support.active_role.role}</TableCell>
                                        <TableCell>{support.time_out ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

            </div>
            <div>
                {summaryTable}
            </div>
            <div className='finalize-day-generate-report-buttons'>
                {!allClockedOut ?
                    (
                        <Tooltip title="all support staff must be clocked out" >
                            <span>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '20px' }}
                                    disabled={!allClockedOut}
                                >
                                    Finalize Day
                                </Button>
                            </span>
                        </Tooltip>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFinalizeDay}
                            style={{ marginTop: '20px' }}
                        >
                            Finalize Day
                        </Button>
                    )
                }
                {!dayFinalized ?
                    (
                        <Tooltip title="day must be finalized first" >
                            <span>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '20px' }}
                                    disabled={!dayFinalized}
                                >
                                    Generate Report
                                </Button>
                            </span>
                        </Tooltip>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpenReportModal}
                            style={{ marginTop: '20px' }}
                        >
                            Generate Report
                        </Button>
                    )}
            </div>

            <Modal
                open={showDateModal}
                onClose={handleCloseDateModal}
            >
                <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', minWidth: '300px' }}>
                    <div >
                        <Typography variant="h6" sx={{ marginRight: '10px', marginBottom: '15px', marginTop: '-5px' }}>
                            Choose a Date for Your Report
                            <IconButton
                                color='inherit'
                                onClick={handleCloseDateModal}
                                sx={{ marginLeft: '10px', position: 'relative', left: '12px' }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                    </div>
                    <DatePicker
                        value={date}
                        onChange={handleDate}
                    />
                    <Button
                        variant='contained'
                        onClick={handleDateChange}
                        style={{ float: 'right', marginTop: '17px' }}
                    >
                        Change
                    </Button>
                </Paper>
            </Modal>
            <Modal
                open={showReportModal}
                onClose={handleCloseDateModal}
            >
                <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', minWidth: '300px' }}>
                    <div>
                        <Typography variant="h6" sx={{ marginRight: '10px', marginBottom: '15px', marginTop: '-5px' }}>
                            Are you sure you want to generate a report for {formattedDate}?
                        </Typography>
                    </div>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleGenerateReport}
                        style={{ float: 'right', marginTop: '17px' }}
                    >
                        Yes, Generate Report
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={handleCloseReportModal}
                        style={{ float: 'left', marginTop: '17px' }}
                    >
                        Cancel
                    </Button>
                </Paper>
            </Modal>
            <ModalRoot />
        </div>
    )
};

export default ReportsPage;