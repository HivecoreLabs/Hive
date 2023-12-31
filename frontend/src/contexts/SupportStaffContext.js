import React, { createContext, useContext, useReducer } from 'react';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const SupportStaffContext = createContext();
const SupportStaffDispatch = createContext();
export const useSupportStaffContext = () => useContext(SupportStaffContext);
export const useSupportStaffDispatch = () => useContext(SupportStaffDispatch);

const RECEIVE_ONE_SUPPORT_STAFF = 'support/RECEIVE_ONE_SUPPORT_STAFF';
const RECEIVE_ALL_SUPPORT_STAFF = 'support/RECEIVE_ALL_SUPPORT_STAFF';
const UPDATE_SUPPORT_STAFF = 'support/UPDATE_SUPPORT_STAFF';
const DELETE_SUPPORT_STAFF = 'support/DELETE_SUPPORT_STAFF';

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

const updateSupportStaff = (payload, clockInId) => {
    return {
        type: UPDATE_SUPPORT_STAFF,
        payload,
        clockInId
    };
};

const deleteSupportStaff = (clockInId) => {
    return {
        type: DELETE_SUPPORT_STAFF,
        clockInId
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
            const updatedSupportStaffList = state.supportStaff.map((staff) => {
                if (staff.id === action.clockInId) {
                    return { ...staff, ...action.payload };
                }
                return staff;
            });
            return {
                ...state,
                supportStaff: updatedSupportStaffList
            };
        case DELETE_SUPPORT_STAFF:
            const updatedSupportStaff = state.supportStaff.filter((staff) => staff.id !== action.clockInId);
            return {
                ...state,
                supportStaff: updatedSupportStaff
            };
        default:
            return state;
    };
};

export const SupportStaffContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(supportStaffReducer, initialState);

    const fetchAllSupportStaffClockIns = async () => {
        const response = await customFetch('http://localhost:8000/api/clock-ins/');
        if (response.ok) {
            const data = await response.json();
            dispatch(receiveAllSupportStaff(data));
        } else {
            console.error('Could not fetch all clock-ins', error);
        };
        return response;
    };

    const fetchAllSupportStaffClockInsByDate = async (date) => {
        const response = await customFetch(`http://localhost:8000/api/clock-ins/?date=${date}`);
        if (response.ok) {
            const data = await response.json();
            dispatch(receiveAllSupportStaff(data));
        } else {
            console.error('Could not fetch all clock-ins by date', error);
        };
        return response;
    };

    const createSupportStaffClockIn = async (newClockIn) => {
        const response = await customFetch(`http://localhost:8000/api/clock-ins/`, {
            method: 'POST',
            body: newClockIn
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(receiveOneSupportStaff(data));
        } else {
            console.error('Could not create clock-in', error);
        };
        return response;
    };

    const updateSupportStaffClockIn = async (updatedClockIn, id) => {
        const response = await customFetch(`http://localhost:8000/api/clock-ins/${id}/`, {
            method: 'PUT',
            body: updatedClockIn
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateSupportStaff(data, id));
        } else {
            console.error('Could not update clock-in', error);
        };
        return response;
    };

    const deleteSupportStaffClockIn = async (id) => {
        const response = await fetch(`http://localhost:8000/api/clock-ins/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // const data = await response.json();
            dispatch(deleteSupportStaff(id));
        } else {
            console.error('Could not delete clock-in', error);
        };
        return response;
    };

    const value = {
        supportStaff: state.supportStaff,
        fetchAllSupportStaffClockIns,
        fetchAllSupportStaffClockInsByDate,
        createSupportStaffClockIn,
        updateSupportStaffClockIn,
        deleteSupportStaffClockIn
    };

    return (
        <SupportStaffContext.Provider value={value}>
            <SupportStaffDispatch.Provider value={dispatch}>
                {children}
            </SupportStaffDispatch.Provider>
        </SupportStaffContext.Provider>
    )
};