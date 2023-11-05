import React, { useState, useContext, createContext } from 'react';
import dayjs from 'dayjs';

const ShiftContext = createContext();
export const useShiftContext = () => useContext(ShiftContext);

const ShiftContextProvider = ({ children }) => {
    const [shiftDate, setShiftDate] = useState(dayjs());
    const [firstClockInMade, setFirstClockInMade] = useState(false);
    const [generatedReportForDay, setGeneratedReportForDay] = useState(false);

    const resetState = () => {
        setFirstClockInMade(false);
        setGeneratedReportForDay(false);
        setShiftDate(dayjs());
    };

    const value = {
        shiftDate,
        setShiftDate,
        firstClockInMade,
        setFirstClockInMade,
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