import { AxiosResponse } from 'axios';

import axiosClient from '@/api/axiosClient';
import { ResProducts } from '@/shared/types/productType';

import {
  ReqLogin,
  ReqRefresh,
  ReqRegister,
  ResLogin,
  ResRefreshToken,
  ResRegister,
} from '../shared/types/authType';
import { ReqSearch } from '../shared/types/itemType';

export const CmsApi = {
  login: async (req: ReqLogin) => {
    return (
      await axiosClient.post<AxiosResponse<ResLogin>>('/api/auth/login', req)
    ).data;
  },

  register: (req: ReqRegister) => {
    return axiosClient.post<ResRegister>('/api/auth/register', req);
  },

  refreshToken: async (req: ReqRefresh) => {
    return (
      await axiosClient.post<AxiosResponse<ResRefreshToken>>(
        '/api/auth/refresh-token',
        req
      )
    ).data;
  },

  getProduct: ({ sort, page, take }: ReqSearch) => {
    return axiosClient.get<ResProducts>('/api/item/search', {
      params: { sort, page, take },
    });
  },
};
