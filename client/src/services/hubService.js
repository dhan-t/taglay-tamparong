import axios from 'axios';

// Ensure this matches your server port (8000 based on your index.js)
const API_URL = 'http://localhost:5000/api/hubs';

export const createHub = async (name) => {
  try {
    const response = await axios.post(API_URL, { name });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to create hub";
  }
};

export const getHub = async (roomCode) => {
  try {
    const response = await axios.get(`${API_URL}/${roomCode}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Hub not found";
  }
};