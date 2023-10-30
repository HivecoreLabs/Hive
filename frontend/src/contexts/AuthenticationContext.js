import React, { createContext, useContext, useState } from 'react';
import customFetch from '../utils/customFetch';

const AuthenticationContext = createContext();

export const useAuth = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8000/api/auth/login/', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                debugger
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
            } else {
                console.error('Login failed:', response.statusText);
            };
            return response;
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    const logout = () => {
        if (localStorage.getItem('token')) localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const signup = async (username, password) => {
        debugger
        try {
            const response = await fetch('http://localhost:8000/api/auth/signup/', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                // localStorage.setItem('token', data.token);
                // setIsAuthenticated(true);
            } else {
                console.error('Signup failed:', response.statusText);
            };
            return response;

        } catch (error) {
            console.error('An error occurred during signup:', error);
        }
    };



    const value = {
        isAuthenticated,
        login,
        logout,
        signup
    };

    // Provide the context to the app
    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    );
};
