import axios from 'axios';

const API_URL = '/api';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/token/`, {
    username,
    password
  });
  
  if (response.data.access) {
    localStorage.setItem('petdaycare_user', JSON.stringify({
      username,
      token: response.data.access,
      refresh: response.data.refresh
    }));
  }
  
  return response.data;
};

export const register = async (username, email, password) => {
  return axios.post(`${API_URL}/register/`, {
    username,
    email,
    password
  });
};

export const logout = () => {
  localStorage.removeItem('petdaycare_user');
};