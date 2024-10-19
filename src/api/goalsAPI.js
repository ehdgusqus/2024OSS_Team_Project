// src/api/goalsAPI.js
import axios from 'axios';

const API_URL = 'https://66ff38202b9aac9c997e8f49.mockapi.io/api/oss/goals';

export const fetchGoals = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
