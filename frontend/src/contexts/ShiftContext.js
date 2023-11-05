import React, { useState, useContext, createContext } from 'react';

const ShiftContext = createContext();
export const useShiftContext = () => useContext(ShiftContext);

const ShiftContextProvider = ({ children }) => {
    const [shiftDate, setShiftDate] = useState(new Date());
    const [firstCheckoutMade, setFirstCheckoutMade] = useState(false);
    const [generatedReportForDay, setGeneratedReportForDay] = useState(false);

    const resetState = () => {
        setFirstCheckoutMade(false);
        setGeneratedReportForDay(false);
    };

    const value = {
        shiftDate,
        setShiftDate,
        firstCheckoutMade,
        setFirstCheckoutMade,
        generatedReportForDay,
        setGeneratedReportForDay,
        resetState,
    };

    return (
        <ShiftContext.Provider value={value}>
            {children}
        </ShiftContext.Provider>
    )
};

export default ShiftContextProvider;