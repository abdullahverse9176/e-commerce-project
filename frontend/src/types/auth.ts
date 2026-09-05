export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface AuthError {
  message: string;
}

export interface LoginInterfce {
  email: string,
  password: string
}

export interface SignUpInterfce {
  name: string,
  email: string,
  password: string
}