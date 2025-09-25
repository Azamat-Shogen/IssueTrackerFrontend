import axios from 'axios';

// const apiUrl = process.env.REACT_SPRING_BOOT_API as string;
const apiUrl = "http://localhost:8080/api"

export interface IAuthRequest {
    username: string;
    password: string;
}

export interface IAuthResponse {
    token: string;
}

export const login = async (credentials: IAuthRequest): Promise<IAuthResponse> => {
    try {
        const response = await axios.post<IAuthResponse>(`${apiUrl}/auth/login`, credentials);
        return response.data;
    } catch (error: any) {
        
        throw new Error(error.response.data || "Login Failed")
    }
}

export const register = async (credentials: IAuthRequest) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/register`, credentials);
        return response.data;
    } catch (err: any) {
        throw new Error(err.response.data.error || "Registration Failed")
    }
}