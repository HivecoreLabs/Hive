import React from "react";
import LoadingAM from "./LoadingAM.jsx";
import LoadingPM from "./LoadingPM.jsx";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@emotion/react";

const Loading = () => {
    const theme = useTheme();
    const navigate = useNavigate()

    const loadingScreen = theme.isAMShift ? <LoadingAM /> : <LoadingPM />

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