import { AuthResponse } from '../types/auth';
import { useMutation } from '@tanstack/react-query';

const API_BASE = '/api';

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed. Please check your credentials.');
  }
  return data;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string,
  role: 'user' | 'admin' = 'user'
): Promise<AuthResponse> => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Registration failed.');
  }
  return data;
};

export const fetchProductsApi = async () => {
  const res = await fetch(`${API_BASE}/products/get-products`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch products');
  }
  return data;
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
  });

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      registerApi(name, email, password),
  });