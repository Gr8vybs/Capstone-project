
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, credentials);
    if (!response.data || !response.data.user || !response.data.token) {
      throw new Error('Invalid response from server');
    }
    return response.data; // Expected: { user: { email }, token }
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (!response.data || !response.data.user || !response.data.token) {
      throw new Error('Invalid response from server');
    }
    return response.data; // Expected: { user: { email }, token }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

  export const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } finally {
      localStorage.removeItem('token');
    }
  };