import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';

const CheckoutsContext = createContext();
export const useCheckoutsContext = () => useContext(CheckoutsContext);

const RECEIVE_ONE_CHECKOUT = 'checkouts/RECEIVE_ONE_CHECKOUT';
const RECEIVE_ALL_CHECKOUTS = 'checkouts/RECEIVE_ALL_CHECKOUTS';
const UPDATE_CHECKOUT = 'checkouts/UPDATE_CHECKOUT';
const DELETE_CHECKOUT = 'checkouts/DELETE_CHECKOUT';

const receiveOneCheckout = (payload) => {
    return {
        type: RECEIVE_ONE_CHECKOUT,
        payload
    };
};

const receiveAllCheckouts = (payload) => {
    return {
        type: RECEIVE_ALL_CHECKOUTS,
        payload
    };
};

const updateCheckout = (payload, checkoutId) => {
    return {
        type: UPDATE_CHECKOUT,
        payload,
        checkoutId
    };
};

const deleteCheckout = (checkoutId) => {
    return {
        type: DELETE_CHECKOUT,
        checkoutId
    };
};

const initialState = {
    checkouts: []
};

const checkoutsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_ONE_CHECKOUT:
            return {
                ...state,
                checkouts: [...state.checkouts, action.payload]
            };
        case RECEIVE_ALL_CHECKOUTS:
            return {
                ...state,
                checkouts: action.payload
            };
        case UPDATE_CHECKOUT:
            const updatedcheckoutsList = state.checkouts.map((checkout) => {
                if (checkout.id === action.checkoutId) {
                    return { ...checkout, ...action.payload };
                }
                return checkout;
            });
            return {
                ...state,
                checkouts: updatedcheckoutsList
            };
        case DELETE_CHECKOUT:
            const updatedcheckouts = state.checkouts.filter((checkout) => checkout.id !== action.checkoutId);
            return {
                ...state,
                checkouts: updatedcheckouts
            };
        default:
            return state;
    };
};

const CheckoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(checkoutsReducer, initialState);

    // const fetchAllCheckouts = async () => {
    //     const response = await customFetch('http://localhost:8000/api/checkouts/');

    //     if (response.ok) {
    //         const data = await response.json();
    //         dispatch(receiveAllCheckouts(data));
    //     } else {
    //         console.error('Could not fetch all checkouts', error);
    //     };
    //     return response;
    // };

    const fetchAllCheckouts = async (date, isAMShift) => {
        debugger
        let queryString = '';
        if (date) {
            queryString += `?date=${date}`;
        }
        if (isAMShift !== undefined) {
            queryString += queryString.length ? '&' : '';
            queryString += `?is_am_shift=${isAMShift ? 'True' : 'False'}`;
        }

        const apiUrl = `http://localhost:8000/api/checkouts/${queryString}`;
        const response = await customFetch(apiUrl);

        if (response.ok) {
            const data = await response.json();
            dispatch(receiveAllCheckouts(data));
        } else {
            console.error('Could not fetch checkouts', error);
        };

        return response;
    };


    const createCheckout = async (newCheckout) => {
        debugger
        const response = await customFetch(`http://localhost:8000/api/checkouts/`, {
            method: 'POST',
            body: newCheckout
        });
        if (response.ok) {
            debugger
            const data = await response.json();
            dispatch(receiveOneCheckout(data));
        } else {
            console.error('Could not create checkout', error);
        };
        return response;
    };

    const updateCheckoutFetch = async (updatedCheckout, id) => {
        const response = await customFetch(`http://localhost:8000/api/checkouts/${id}/`, {
            method: 'PUT',
            body: updatedCheckout
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateCheckout(data, id));
        } else {
            console.error('Could not update checkout', error);
        };
        return response;
    };

    const deleteCheckoutFetch = async (id) => {
        const response = await customFetch(`http://localhost:8000/api/checkouts/${id}/`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // const data = await response.json();
            dispatch(deleteCheckout(id));
        } else {
            console.error('Could not delete checkout', error);
        };
        return response;
    };

    const value = {
        checkouts: state.checkouts,
        fetchAllCheckouts,
        createCheckout,
        updateCheckoutFetch,
        deleteCheckoutFetch
    };

    return (
        <CheckoutsContext.Provider value={value}>
            {children}
        </CheckoutsContext.Provider>
    )
};

export default CheckoutsContextProvider;
