import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
            setCurrentUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'user@example.com' && password === 'password') {
                    const user = {
                        id: 1,
                        name: 'John Doe',
                        email: email,
                        role: 'user'
                    };
                    const token = 'mock_jwt_token_' + Math.random().toString(36);
                    
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userData', JSON.stringify(user));
                    setCurrentUser(user);
                    resolve(user);
                } else {
                    reject(new Error('Email atau password salah'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        login,
        logout,
        isAuthenticated: !!currentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}