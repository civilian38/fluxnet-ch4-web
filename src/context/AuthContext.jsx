import React, { createContext, useState, useEffect } from 'react';
import { getUserInfoAPI } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkLoginStatus = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const userInfo = await getUserInfoAPI();
                setUser(userInfo);
            } catch (err) {
                console.error("Login status check failed", err);
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const loginSuccess = async (tokens) => {
        localStorage.setItem('accessToken', tokens.access);
        if (tokens.refresh) {
            localStorage.setItem('refreshToken', tokens.refresh);
        }
        await checkLoginStatus();
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginSuccess, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
