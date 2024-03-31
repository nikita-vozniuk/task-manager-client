import axios from 'axios';

import { backendUrl } from '../config';

export const isAuthAPI = async (credentials: { sessionToken: string }) => {
    return await axios.post(backendUrl + '/auth', credentials);
};

export const loginAPI = async (credentials: { email: string; password: string }) => {
    return await axios.post(backendUrl + '/auth/login', credentials);
};

export const registerAPI = async (userData: { username: string; email: string; password: string }) => {
    console.log(backendUrl + '/auth/register');
    return await axios.post(backendUrl + '/auth/register', userData);
};

export const logoutAPI = async () => {
    return await axios.post(backendUrl + '/auth/logout');
};