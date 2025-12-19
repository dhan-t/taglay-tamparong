import axios from 'axios';

// Ensure this matches your server port (5000 or 8000)
const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async (hubId) => {
  const response = await axios.get(`${API_URL}/${hubId}`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await axios.patch(`${API_URL}/${taskId}`, { status });
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/${taskId}`);
  return response.data;
};