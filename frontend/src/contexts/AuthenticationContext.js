import React, { createContext, useContext, useState } from 'react';

// Create an AuthenticationContext
const AuthenticationContext = createContext();

// Create a custom hook for using the authentication context
export const useAuth = () => useContext(AuthenticationContext);

// Create an AuthenticationProvider component
export const AuthenticationProvider = ({ children }) => {
    // State to track the authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to simulate a login action
    const login = () => {
        // In a real application, you would perform actual login logic here
        // For demonstration purposes, we'll set isAuthenticated to true
        setIsAuthenticated(true);
    };

    // Function to simulate a logout action
    const logout = () => {
        // In a real application, you would perform actual logout logic here
        // For demonstration purposes, we'll set isAuthenticated to false
        setIsAuthenticated(false);
    };

    // Value object to provide to the context
    const value = {
        isAuthenticated,
        login,
        logout,
    };

    // Provide the context to the app
    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    );
};
