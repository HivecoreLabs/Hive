import React, { useEffect } from "react";
import LoadingAM from "./LoadingAM.jsx";
import LoadingPM from "./LoadingPM.jsx";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@emotion/react";

const Logout = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const loadingScreen = theme.isAMShift ? <LoadingAM /> : <LoadingPM />;

    return (
        <>
            {loadingScreen}
        </>
    );
};

export default Logout;
