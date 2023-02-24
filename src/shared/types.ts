import { ReactElement, ReactNode } from 'react';

export type WithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface ReqLogin {
  email: string;
  password: string;
}

export interface ReqRegister {
  username: string;
  email: string;
  password: string;
}

export interface IResLogin {
  token: string;
  user: IUser;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
  id_getkanban: string;
  accessToken: string;
  refreshToken: string;
}
