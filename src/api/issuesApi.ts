import axios from 'axios';
import { getToken, getUser } from '../utils/auth';


// const apiUrl = process.env.REACT_SPRING_BOOT_API as string;
const apiUrl = "http://localhost:8080/api"


export const getIssues = async () => {

    const user = getUser();
    const token = getToken();

    if (!user || !token) return [];

    const url = user.role === "ADMIN" ? `${apiUrl}/issues/admin` : `${apiUrl}/issues`;

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
        return [];
    }
}

export const getIssueById = async (issueId: string) => {
    const user = getUser();
    const token = getToken();

    if (!user || !token) return [];

    const url = user.role === "ADMIN" ? `${apiUrl}/issues/admin/${issueId}` : `${apiUrl}/issues/${issueId}`;

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