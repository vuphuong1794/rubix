export interface ResLogin {
  data: { access_token: string; refresh_token: string };
  user: User;
  token: Token;
}

export interface ReqLogin {
  email: string;
  password: string;
  requestFrom: string;
}

export interface LoginParams {
  reqLogin: ReqLogin;
  callback: any;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  email: string;
  phone: string;
  avatar: null;
  role: string;
}

export interface ReqRegister {
  username: string;
  password: string;
  email: string;
}

export interface ReqRefresh {
  refresh_token: any;
}

export interface ResRegister {
  username: string;
  email: string;
  password: string;
  phone: string;
  avatar: null;
  id: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  settings: Settings;
  isActive: boolean;
}

export interface ResRefreshToken {
  access_token: string;
  refresh_token: string;
  expiresIn: string;
}

export interface Settings {
  isEmailVerified: boolean;
  userId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
