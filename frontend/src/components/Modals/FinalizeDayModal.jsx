import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModalContext } from '../../contexts/ModalContext';
import { useSummaryContext } from '../../contexts/SummaryContext';
import { Fade } from '@mui/material';
import { useDateContext } from '../../contexts/DateContext';

const FinalizeDayModal = ({ dayFinalized, setDayFinalized }) => {
    const { stateDate } = useDateContext();
    const [open, setOpen] = useState(true);
    const { openModal, closeModal, modalDispatch } = useModalContext();
    const { summary, fetchEndOfDaySummary } = useSummaryContext();

    const handleClose = () => {
        modalDispatch(closeModal());
    }

    const handleSubmitFinalizeDay = () => {
        setDayFinalized(true);
        const body = {
            date: stateDate.format('YYYY-MM-DD')
        }
        fetchEndOfDaySummary(body);
        modalDispatch(closeModal());
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle >
                Are you sure you want to finalize today's work day?
            </DialogTitle>
            <DialogContent style={{ paddingBottom: '0' }}>
                <DialogContentText >
                    All support staff clocked out?
                </DialogContentText>
                <DialogContentText >
                    All servers checked out?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='warning' onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmitFinalizeDay} autoFocus>
                    Finalize Day
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FinalizeDayModal;