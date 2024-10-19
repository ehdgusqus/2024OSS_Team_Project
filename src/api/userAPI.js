// src/api/userAPI.js
import axios from 'axios';

const API_URL = 'https://670367bbbd7c8c1ccd414d3f.mockapi.io/api/oss_Data/users';

export const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};

export const updateUser = async (userId, userData) => {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return response.data;
};

export const deleteUser = async (userId) => {
    await axios.delete(`${API_URL}/${userId}`);
};
