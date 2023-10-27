import { Modal, Box, Button, Typography } from "@mui/material"
import React from "react";

function SignupModal({ open, closeModal }) {

    return (
        <Modal open={open} onClose={closeModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6">Register</Typography>
                <Button onClick={closeModal}>Close</Button>
            </Box>
        </Modal>
    )
};

export default SignupModal;

