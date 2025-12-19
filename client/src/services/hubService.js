import axios from 'axios';

const API_URL = 'http://localhost:5000/api/hubs';

export const createHub = async (name) => {
  try {
    const response = await axios.post(API_URL, { name });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Failed to create hub";
  }
};

// NEW: Using POST to validate code and get Role
export const joinHub = async (code) => {
  try {
    // We send { code: "1234" } to the backend
    const response = await axios.post(`${API_URL}/join`, { code });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Invalid Room or Admin Code";
  }
};