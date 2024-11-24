// src/contexts/traveler-auth.context.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { api_url } from "../utils/domain/back.ts";

interface AuthContextType {
    isAuthenticated: boolean;
    checkAuth: () => void;
    isLoading: boolean;
    userRole?: string; // Add this line
    userId?: string; // Add this line
    hasInterests?: boolean; // Add this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Add this line
    const [userRole, setUserRole] = useState<string>(''); // Add this line
    const [userId, setUserId] = useState<string>(''); // Add this line
    const [hasInterests, setHasInterests] = useState<boolean>(false); // Add this line

    const checkAuth = async () => {
        try {
            await axios.get(`${api_url}/loggedIn`, { withCredentials: true }).then(response => {
                setIsAuthenticated(response?.data?.state);
                setUserRole(response?.data?.token?.role);
                setUserId(response?.data?.token?.id);
                setHasInterests(response?.data?.token?.hasInterests);
            });
        } catch (error) {
            console.error('Failed to check authentication:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false); // Set loading to false once the check completes

        }
    };

    useEffect(() => {
        checkAuth()
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuth, isLoading, userRole, userId, hasInterests }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
