import axios from 'axios';

const API_URL = process.env.REACT_APP_SPRING_BOOT_API;


export interface IAuthRequest {
    username: string;
    password: string;
}

export interface IAuthResponse {
    token: string;
}

export const login = async (credentials: IAuthRequest): Promise<IAuthResponse> => {
    try {
        const response = await axios.post<IAuthResponse>(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error: any) {
        
        throw new Error(error.response.data || "Login Failed")
    }
}

export const register = async (credentials: IAuthRequest) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, credentials);
        return response.data;
    } catch (err: any) {
        throw new Error(err.response.data.error || "Registration Failed")
    }
}