import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string;
    role: "USER" | "ADMIN";
}


export const getToken = () => localStorage.getItem("token");

export const setToken = (token: string) => {
    localStorage.setItem("token", token);

    try {
        const decoded = jwtDecode<JwtPayload>(token);

        const user = {
            username: decoded.sub,
            role: decoded.role
        }
        
        setUser(user);

    } catch (error) {
        console.log("Failed to decode token: ", error);
        clearUser();
    }
} 

export const clearToken = () => localStorage.removeItem("token");

export const isAuth = () => !!getToken();

export const setUser = (user: { username: string, role: string }) => {
    
    localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export const clearUser = () => localStorage.removeItem("user");

export const logout = () => {
    clearToken();
    clearUser();
}