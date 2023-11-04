import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, TextField, Button, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import './CheckoutsForm.css';
import { useEmployees } from '../../contexts/EmployeesContext';
import { useRoles } from '../../contexts/RolesContext';
import { useSupportStaffContext } from '../../contexts/SupportStaffContext';
import { useTheme } from '@mui/material';

const CheckoutsForm = () => {
    return (
        <div></div>
    )
};

export default CheckoutsForm;