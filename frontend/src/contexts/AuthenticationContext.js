import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => useContext(AuthenticationContext);
const AuthenticationContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export const AuthenticationProvider = ({ children }) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (username, password) => {
        try {
            const response = await customFetch('http://localhost:8000/api/auth/login/', {
                method: 'POST',
                body: { username, password }
            });
            if (response.ok) {
                const data = await response.json();
                const authData = {
                    token: data.token,
                    user: data.user
                };
                sessionStorage.setItem('authData', JSON.stringify(authData));
                dispatch({ type: 'LOGIN', payload: data.user });
                navigate('/dashboard');
            } else {
                console.error('Login failed:', response.statusText);
            };
            return response;
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    const signup = async (username, password) => {
        try {
            const response = await customFetch('http://localhost:8000/api/auth/signup/', {
                method: 'POST',
                body: { username, password }
            });
            if (response.ok) {
                const data = await response.json();
                const authData = {
                    token: data.token,
                    user: data.user
                };
                sessionStorage.setItem('authData', JSON.stringify(authData));
                dispatch({ type: 'LOGIN', payload: data.user });
                navigate('/dashboard');
            } else {
                console.error('Signup failed:', response.statusText);
            };
            return response;

        } catch (error) {
            console.error('An error occurred during signup:', error);
        }
    };

    const logout = () => {
        sessionStorage.clear();
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const value = {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        login,
        logout,
        signup,
    };

    useEffect(() => {
        const authDataString = sessionStorage.getItem('authData');
        if (authDataString) {
            const authData = JSON.parse(authDataString);
            dispatch({ type: 'LOGIN', payload: authData.user });
        }
    }, [dispatch]);

    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    );
};
