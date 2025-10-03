import axios from 'axios';
import { IUser } from '../types';
import { getToken, getUser } from '../utils/auth';


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

export const fetchUsers = async (): Promise<IUser[]> => {
  const user = getUser();
  const token = getToken();
  
    if (!user || !token || user.role !== "ADMIN") return [];  

    try {
        const response = await axios.get<IUser[]>(`${API_URL}/admin/users`, {
            headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        });

        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }

}

export const deleteUser = async (id: string): Promise<string> => {
    const user = getUser();
    const token = getToken();
  
    if (!user || !token || user.role !== "ADMIN") {
        // throw new Error("Not authorized");
        return "Not authorized";
    } 

    try {
        await axios.delete(`${API_URL}/admin/users/${id}`, {
             headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        });

        return "User deleted successfully";
        
    } catch (err) {
        console.log(err);
        return "Something went wrong while deleting a user"
    }
}