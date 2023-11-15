import React, { useReducer, useContext, createContext } from 'react';
import dayjs from 'dayjs';

const DateContext = createContext();
export const useDateContext = () => useContext(DateContext);

const RECEIVE_DATE_CHANGE = 'date/RECEIVE_DATE_CHANGE';
const RESET_DATE = 'date/RESET_DATE';

const receiveDateChange = (payload) => {
    return {
        type: RECEIVE_DATE_CHANGE,
        payload
    };
};

const resetDate = () => {
    return {
        type: RESET_DATE
    }
}

const initialState = {
    date: dayjs()
}

const dateReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_DATE_CHANGE:
            return {
                ...state,
                date: action.payload
            };
        case RESET_DATE:
            return initialState;
        default:
            return state;
    };
};

const DateContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dateReducer, initialState);

    const changeStateDate = (date) => {
        dispatch(receiveDateChange(date));
    };

    const clearStateDate = () => {
        dispatch(resetDate());
    }

    const value = {
        stateDate: state.date,
        changeStateDate,
        clearStateDate
    };

    return (
        <DateContext.Provider value={value}>
            {children}
        </DateContext.Provider>
    )
};

export default DateContextProvider;