import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "974e9f2b-a26c-4888-891b-d2b3c8dd1403"
    }
})