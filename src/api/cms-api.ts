import { AxiosResponse } from 'axios';

import axiosClient from '@/api/axiosClient';
import { ReqCartItem, ResCart } from '@/shared/types/cartType';
import { ResCategories } from '@/shared/types/categories';
import { ReqSearchProduct } from '@/shared/types/itemType';
import { OrderRes } from '@/shared/types/orderType';
import { ResProducts } from '@/shared/types/productType';

import {
  ReqCreateOrder,
  ReqLogin,
  ReqRefresh,
  ReqRegister,
  ResLogin,
  ResRefreshToken,
  ResRegister,
} from '../shared/types/authType';
import { CreateRating } from '../shared/types/ratingType';

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

  getProducts: ({
    sort,
    page,
    take,
    cates_slug,
    search,
    start_price,
    end_price,
  }: ReqSearchProduct) => {
    return axiosClient.get<ResProducts>('/api/item/search', {
      params: { sort, page, take, cates_slug, search, start_price, end_price },
    });
  },

  getCategories: () => {
    return axiosClient.get<ResCategories>('/api/cat');
  },

  getProductsByCategoryId: ({ id }: { id: string }) => {
    return axiosClient.get<ResProducts>(`/api/item/${id}`);
  },
  getDetailItem: (id: string) => {
    return axiosClient.get(`api/item/${id}`);
  },

  getCart: () => {
    return axiosClient.get<ResCart>(`/api/cart`);
  },

  addToCart: (req: ReqCartItem[]) => {
    const params = { items: req };
    return axiosClient.post(`/api/cart/add`, params);
  },

  deleteCartItem: (id: string[]) => {
    const params = { itemsId: id };
    return axiosClient.delete(`api/cart/delete-cart-item`, { data: params });
  },
  createOrder: (data: ReqCreateOrder[]) => {
    return axiosClient.post(`api/order/create`, {
      data,
    });
  },

  getOrder: () => {
    return axiosClient.get<OrderRes>(`api/order/list`);
  },

  createReview: ({ content, item_id, rating, order_item_id }: CreateRating) => {
    return axiosClient.post<CreateRating>(`api/review/create`, {
      content,
      rating,
      item_id,
      order_item_id,
    });
  },
};
