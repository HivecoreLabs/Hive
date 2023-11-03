import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';

const SupportStaffContext = createContext();
const SupportStaffDispatch = createContext();
export const useSupportStaffContext = () => useContext(SupportStaffContext);
export const useSupportStaffDispatch = () => useContext(SupportStaffDispatch);

const RECEIVE_ONE_SUPPORT_STAFF = 'support/RECEIVE_ONE_SUPPORT_STAFF';
const RECEIVE_ALL_SUPPORT_STAFF = 'support/RECEIVE_ALL_SUPPORT_STAFF';
const UPDATE_SUPPORT_STAFF = 'support/UPDATE_SUPPORT_STAFF';

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

const updateSupportStaff = (payload, supportStaffId) => {
    return {
        type: UPDATE_SUPPORT_STAFF,
        payload,
        supportStaffId
    };
};


const initialState = {
    supportStaff: []
};

const supportStaffReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_ONE_SUPPORT_STAFF:
            return {
                ...state,
                supportStaff: [...state.supportStaff, action.payload]
            };
        case RECEIVE_ALL_SUPPORT_STAFF:
            return {
                ...state,
                supportStaff: action.payload
            };
        case UPDATE_SUPPORT_STAFF:
            return {
                ...state,
                supportStaff: [...state.supportStaff],

            }
        default:
            return state;
    };
};

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

