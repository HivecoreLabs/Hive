import React, { createContext, useContext, useState } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        // In a real application, you would perform actual login logic here
        // For demonstration purposes, we'll set isAuthenticated to true
        setIsAuthenticated(true);
    };

    const logout = () => {
        // In a real application, you would perform actual logout logic here
        // For demonstration purposes, we'll set isAuthenticated to false
        setIsAuthenticated(false);
    };

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
