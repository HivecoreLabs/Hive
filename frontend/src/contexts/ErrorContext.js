import React, { useState, useContext, createContext, useReducer } from 'react';

const ErrorContext = createContext();
export const useError = useContext(ErrorContext);

const initialState = {
    error: false,
    errorMessage: null
};



