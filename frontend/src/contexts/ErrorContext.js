import React, { useState, useContext, createContext, useReducer } from 'react';

const ErrorContext = createContext();
export const useError = () => useContext(ErrorContext);

const ERROR_OCCURRED = 'errors/ERROR_OCCURRED';
const ERROR_CLEARED = 'errors/ERROR_CLEARED';

const errorOccurred = (errorMessage) => ({
    type: ERROR_OCCURRED,
    payload: errorMessage,
});

const clearError = () => ({
    type: ERROR_CLEARED,
});

const initialState = {
    error: false,
    errorMessage: null
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR_OCCURRED:
            return {
                error: true,
                errorMessage: action.payload,
            };
        case ERROR_CLEARED:
            return initialState;
        default:
            return state;
    }
};

export const ErrorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(errorReducer, initialState);

    const value = {
        error: state.error,
        errorMessage: state.errorMessage,
        errorOccurred,
        clearError,
        errorDispatch: dispatch
    };

    return (
        <ErrorContext.Provider value={value} >
            {children}
        </ErrorContext.Provider>
    );
};


