import React from "react";
import LoadingAM from "./LoadingAM.jsx";
import LoadingPM from "./LoadingPM.jsx";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@emotion/react";

const Logout = () => {
    const navigate = useNavigate()
    const theme = useTheme();

    const loadingScreen = theme.isAMShift ? <LoadingAM></LoadingAM> : <LoadingPM></LoadingPM>

    setTimeout(() => {
        navigate('/')
    }, 2000);

    return (
        <>
            {loadingScreen}
        </>
    )
};

export default Logout;