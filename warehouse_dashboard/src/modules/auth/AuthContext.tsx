import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

interface AuthContextProps {
    isLoggedIn?: boolean;
    setLoggedIn: (status: boolean, token:string, path?:string) => void;
    redirectPath: string | null;
    logout: ()=>void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [redirectPath, setRedirectPath] = useState<string | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            setLoggedIn(true)
        }else{
            if (!storedToken && (window.location.pathname !== '/login' && window.location.pathname !== '/signup')) {
                setRedirectPath(window.location.pathname);
                navigate('/login');
            }
        }
    }, [navigate]);

    // Función para iniciar sesión y almacenar la información del usuario en localStorage
    const setLoggedInAndStore = (status: boolean, token: string, path?: string) => {
        status && localStorage.setItem('token', token);
        setLoggedIn(status);
        status && path && navigate(path);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setRedirectPath(null);
        navigate('/login');
    };

    const value: AuthContextProps = {
        isLoggedIn,
        setLoggedIn: setLoggedInAndStore,
        logout,
        redirectPath,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
