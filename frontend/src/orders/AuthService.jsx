import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Signup function
export const signup = async (user) => {
  const response = await axios.post(`${API_URL}/users`, user, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Login function
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
