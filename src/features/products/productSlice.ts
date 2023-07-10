import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import { OrderData } from '@/shared/types/orderType';
import { Product } from '@/shared/types/productType';

interface InitialState {
  subItemChoose: string;
  subColorChoose: string;
  subPriceChoose: string;
  valueImage: string;
  products: Product[];
  orders: OrderData[];
  loading: boolean;
}

const initialState: InitialState = {
  subItemChoose: 'All Categories',
  subColorChoose: '',
  subPriceChoose: '',
  valueImage: '',
  products: [],
  orders: [],
  loading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setSubItemChoose: (state, action) => {
      state.subItemChoose = action.payload;
    },

    setSubColorChoose: (state, action) => {
      state.subColorChoose = action.payload;
    },

    setSubPriceChoose: (state, action) => {
      state.subPriceChoose = action.payload;
    },

    getValueImage: (state, action) => {
      state.valueImage = action.payload;
    },

    addOrder: (state, action) => {
      state.orders = action.payload;
    },
    setLoadingOrders: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setSubItemChoose,
  getValueImage,
  setSubColorChoose,
  setSubPriceChoose,
  setProducts,
  addOrder,
  setLoadingOrders,
} = productSlice.actions;

export const selectSubItemChoose = (state: RootState) =>
  state.product.subItemChoose;
export const selectSubColorChoose = (state: RootState) =>
  state.product.subColorChoose;
export const selectSubPriceChoose = (state: RootState) =>
  state.product.subPriceChoose;
export const selectValueImage = (state: RootState) => state.product.valueImage;
export const selectProducts = (state: RootState) => state.product.products;
export const selectOrders = (state: RootState) => state.product.orders;
export const selectLoadingOrders = (state: RootState) => state.product.loading;

export default productSlice.reducer;
