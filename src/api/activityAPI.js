import axios from 'axios';

const API_URL = 'https://670367bbbd7c8c1ccd414d3f.mockapi.io/api/oss_Data/activity';

export const fetchActivities = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createActivity = async (activityData) => {
    const response = await axios.post(API_URL, activityData);
    return response.data;
};

export const updateActivity = async (activityId, activityData) => {
    const response = await axios.put(`${API_URL}/${activityId}`, activityData);
    return response.data;
};

export const deleteActivity = async (activityId) => {
    await axios.delete(`${API_URL}/${activityId}`);
};
