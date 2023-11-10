import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useModalContext } from '../../contexts/ModalContext';
import { Fade } from '@mui/material';

const FinalizeDayModal = ({ dayFinalized, setDayFinalized }) => {
    debugger
    const [open, setOpen] = useState(true);
    const { openModal, closeModal, modalDispatch } = useModalContext();

    const handleClose = () => {
        modalDispatch(closeModal());
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle >
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FinalizeDayModal;