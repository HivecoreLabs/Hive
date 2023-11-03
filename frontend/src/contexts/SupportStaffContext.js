import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';

const SupportStaffContext = createContext();
const SupportStaffDispatch = createContext();
export const useSupportStaffContext = () => useContext(SupportStaffContext);
export const useSupportStaffDispatch = () => useContext(SupportStaffDispatch);

const RECEIVE_ONE_SUPPORT_STAFF = 'support/RECEIVE_ONE_SUPPORT_STAFF';
const RECEIVE_ALL_SUPPORT_STAFF = 'support/RECEIVE_ALL_SUPPORT_STAFF';

const receiveOneSupportStaff = (payload) => {
    return {
        type: RECEIVE_ONE_SUPPORT_STAFF,
        payload
    };
};

const receiveAllSupportStaff = (payload) => {
    return {
        type: RECEIVE_ALL_SUPPORT_STAFF,
        payload
    };
};


const initialState = {
    supportStaff: []
};

const supportStaffReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case RECEIVE_ONE_SUPPORT_STAFF:

    }
}

export const SupportStaffContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(supportStaffReducer, initialState);

    const value = {
        supportStaff: state.supportStaff,
    };

    return (
        <SupportStaffContext.Provider value={value}>
            <SupportStaffDispatch.Provider value={dispatch}>
                {children}
            </SupportStaffDispatch.Provider>
        </SupportStaffContext.Provider>
    )
};

