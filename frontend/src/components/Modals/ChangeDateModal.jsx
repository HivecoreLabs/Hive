import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Typography, Paper, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useModalContext } from '../../contexts/ModalContext';
import { useDateContext } from '../../contexts/DateContext';

const ChangeDateModal = () => {
    const { stateDate, changeStateDate } = useDateContext();
    const [date, setDate] = useState(stateDate);
    const { closeModal, modalDispatch } = useModalContext();

    const handleClose = () => {
        modalDispatch(closeModal());
    }

    const handleDate = (value) => {
        setDate(value);
    }

    const handleChangeToday = () => {
        changeStateDate(dayjs())
        handleClose()
    }
    const handleChangeDate = () => {
        changeStateDate(date);
        handleClose()
    }

    return (
        <Modal
            open={true}
            onClose={handleClose}
        >
            <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', minWidth: '300px' }}>

                <div style={{ marginBottom: '30px' }} >
                    <Typography variant="h6" sx={{ marginRight: '10px', marginBottom: '15px', marginTop: '-5px' }}>
                        Choose a Date for Your Clock-Ins/Checkouts
                        <IconButton
                            color='inherit'
                            onClick={handleClose}
                            sx={{ float: 'right', position: 'relative', left: '13px' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <DatePicker
                        value={date}
                        onChange={handleDate}
                        disableFuture={true}
                    // slotProps={{ textField: { size: 'small' } }}

                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '20px' }}>
                        <Button
                            variant='outlined'
                            onClick={handleChangeToday}
                            style={{ marginRight: '10px', height: '100%' }}
                        >
                            Set to Today
                        </Button>
                        <Button
                            variant='contained'
                            onClick={handleChangeDate}
                            style={{ height: '100%' }}
                        // style={{ marginTop: '17px' }}
                        >
                            Change Date
                        </Button>
                    </div>
                </div>
            </Paper>
        </Modal>
    )

};

export default ChangeDateModal;