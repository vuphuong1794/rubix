import { AxiosResponse } from 'axios';

import axiosClient from '@/api/axiosClient';
import { ResCart } from '@/shared/types/cartType';
import { ResCategories } from '@/shared/types/categories';
import { ReqSearchProduct } from '@/shared/types/itemType';
import { ResProducts } from '@/shared/types/productType';

import {
  ReqLogin,
  ReqRefresh,
  ReqRegister,
  ResLogin,
  ResRefreshToken,
  ResRegister,
} from '../shared/types/authType';

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

  getProducts: ({ sort, page, take, cates_slug }: ReqSearchProduct) => {
    return axiosClient.get<ResProducts>('/api/item/search', {
      params: { sort, page, take, cates_slug },
    });
  },

  getCategories: () => {
    return axiosClient.get<ResCategories>('/api/cat');
  },

  getProductsByCategoryId: ({ id }: { id: string }) => {
    return axiosClient.get<ResProducts>(`/api/item/${id}`);
  },

  getCart: () => {
    return axiosClient.get<ResCart>(`/api/cart`);
  },
};
