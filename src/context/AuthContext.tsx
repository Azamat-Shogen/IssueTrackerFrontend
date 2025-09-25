import React, { createContext, useContext, useState } from "react";
import { getUser, getToken, logout as clearAuth, clearToken, clearUser } from "../utils/auth";


export interface IUser {
    username: string;
    role: "USER" | "ADMIN";
}

interface IAuthContext {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    isAuth: boolean;
    logout: () => void;
} 

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [initialized, setInitialized] = useState(false);

    React.useEffect(() => {
        const savedUser = getUser(); // load from localStorage
        if (savedUser) setUser(savedUser);
        setInitialized(true);
    }, []);

    const logout = () => {
        clearToken();
        clearUser();
        clearAuth();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAuth: !!getToken(), logout }}>
            {initialized ? children : null} {/* wait until auth is initialized */}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);