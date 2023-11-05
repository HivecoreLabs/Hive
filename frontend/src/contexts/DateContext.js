import React, { useReducer, useContext, createContext } from 'react';
import dayjs from 'dayjs';

const DateContext = createContext();
export const useDateContext = () => useContext(DateContext);

const RECEIVE_DATE_CHANGE = 'date/RECEIVE_DATE_CHANGE';

const receiveDateChange = (payload) => {
    return {
        type: RECEIVE_DATE_CHANGE,
        payload
    };
};

const initialState = {
    date: dayjs()
}

const dateReducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case RECEIVE_DATE_CHANGE:
            return {
                ...state,
                date: action.payload
            };
        default:
            return state;
    };
};

const DateContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dateReducer, initialState);

    const changeStateDate = async (date) => {
        debugger
        dispatch(receiveDateChange(date));
        return
    };

    const value = {
        stateDate: state.date,
        changeStateDate
    };

    return (
        <DateContext.Provider value={value}>
            {children}
        </DateContext.Provider>
    )
};

export default DateContextProvider;