import { ReactElement, ReactNode } from 'react';

export type WithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface IToken {
  access_token: string;
  refresh_token: string;
}

export interface IResLogin {
  user: IUser;
  token: IToken;
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
