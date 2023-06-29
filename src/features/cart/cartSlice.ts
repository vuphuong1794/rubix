import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CmsApi } from '@/api/cms-api';
import { RootState } from '@/app/store';
import { CartItem } from '@/shared/types/cartType';

export interface CartState {
  cart: CartItem[];
  total: number;
}

export const fetchTotal = createAsyncThunk('cart/fetchTotal', async () => {
  try {
    const response = await CmsApi.getCart(); // Gọi API để lấy tổng
    return response.data.data.cart_items;
  } catch (error) {
    // Xử lý lỗi nếu cần thiết
    throw Error('Failed to fetch total');
  }
});

const initialStateCart: CartState = {
  cart: [],
  total: 0,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: initialStateCart,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTotal.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.total = action.payload.length;
    });
  },
});

export const selectCartTotal = (state: RootState) => state.cart.total;

export default CartSlice.reducer;
