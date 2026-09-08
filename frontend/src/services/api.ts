import axios from 'axios';
import { AuthResponse } from '../types/auth';

const API_BASE = '/api';

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await axios.post(`${API_BASE}/auth/login`, {
    email,
    password
  });

  if (!res.data) {
    throw new Error(res.data.message || 'Login failed. Please check your credentials.');
  }

  return res.data;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await axios.post(`${API_BASE}/auth/register`, {
    name,
    email,
    password
  });

  if (!res.data) {
    throw new Error(res.data.message || 'Registration failed.');
  }
  return res.data;
};
