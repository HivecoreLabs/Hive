import React, { createContext, useContext, useReducer } from "react";
import customFetch from '../utils/customFetch';

const SummaryContext = createContext();
export const useSummaryContext = () => useContext(SummaryContext);

const RECEIVE_SUMMARY = 'summary/RECEIVE_SUMMARY';

const receiveSummary = (payload) => {
    return {
        type: 'RECEIVE_SUMMARY',
        payload
    };
}

const initialState = {
    summary: null
};

const summaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECEIVE_SUMMARY':
            return {
                ...state,
                summary: action.payload
            };
        default:
            return state;
    };
};

const SummaryContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(summaryReducer, initialState);

    const fetchEndOfDaySummary = async (date) => {
        debugger
        const response = await customFetch('http://localhost:8000/api/end-of-day/', {
            method: 'POST',
            body: date
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(receiveSummary(data));
        } else {
            console.error('Could not fetch end of day summary', response.statusText);
        };
        return response;
    };

    const value = {
        summary: state.summary,
        fetchEndOfDaySummary
    };

    return (
        <SummaryContext.Provider value={value}>
            {children}
        </SummaryContext.Provider>
    )
};

export default SummaryContextProvider;

