import apiClient from './apiClient';

export const loginAPI = async (username, password) => {
    const response = await apiClient.post('/authentication/token/', { username, password });
    return response.data;
};

export const registerAPI = async (userData) => {
    const response = await apiClient.post('/authentication/register/', userData);
    return response.data;
};

export const getUserInfoAPI = async () => {
    const response = await apiClient.get('/authentication/user/info/');
    return response.data;
};
