import React, { useEffect } from "react";
import LoadingAM from "./LoadingAM.jsx";
import LoadingPM from "./LoadingPM.jsx";
import HiveRoundedIcon from '@mui/icons-material/HiveRounded';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from "@emotion/react";
import { useAuth } from "../../contexts/AuthenticationContext";

const Loading = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate()
    const theme = useTheme();

    const loadingScreen = theme.isAmShift ? <LoadingAM></LoadingAM> : <LoadingPM></LoadingPM>

    setTimeout(() => {
        navigate('/dashboard')
    }, 2000);

    return (
        <>
            {loadingScreen}
        </>
    )
};

export default Loading;