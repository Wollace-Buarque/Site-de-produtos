import { createContext, useEffect, useState } from "react";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import { auth } from "./Firebase";

interface ContextProps {
    login: Function;
    register: Function;
    authenticated: any;
    user?: any;
    logout: any;
    loading: boolean;
}

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<{} | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])


    const register = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}