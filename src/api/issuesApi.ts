import axios from 'axios';
import { getToken, getUser } from '../utils/auth';
import { Issue, IssueCreate } from '../types';


const API_URL = process.env.REACT_APP_SPRING_BOOT_API;

export const getIssues = async (): Promise<Issue[]> => {

    const user = getUser();
    const token = getToken();

    if (!user || !token) return [];

    const url = user.role === "ADMIN" ? `${API_URL}/issues/admin` : `${API_URL}/issues`;

    try {
        const response = await axios.get<Issue[]>(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return response.data.reverse();

    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getIssueById = async (issueId: string) => {
    const user = getUser();
    const token = getToken();

    if (!user || !token) return [];

    const url = user.role === "ADMIN" ? `${API_URL}/issues/admin/${issueId}` : `${API_URL}/issues/${issueId}`;

    try {
        const response = await axios.get(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return response.data;

    } catch (error) {
        console.log(error);
        return null;
    }

}

export const createIssue = async (issueData: IssueCreate): Promise<Issue | null> => {
    const token = getToken();
    const url = `${API_URL}/issues`;

    try {
        const response = await axios.post<Issue>(url, issueData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Issue created:', response.data);
        return response.data;


    } catch (err) {
        console.error('Failed to create issue:', err);
        return null;
    }

}