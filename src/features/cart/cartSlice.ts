import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CmsApi } from '@/api/cms-api';
import { RootState } from '@/app/store';
import { CartItem } from '@/shared/types/cartType';

export interface CartState {
  cart: CartItem[];
  openPayment: boolean;
  itemPayment: CartItem[];
  totalItemPayment: number;
  total: number;
  chooseHref: string;
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
  openPayment: false,
  itemPayment: [],
  totalItemPayment: 0,
  chooseHref: '',
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: initialStateCart,

  reducers: {
    setOpenPayment: (state, action) => {
      state.openPayment = action.payload;
    },
    setCartPayment: (state, action) => {
      state.itemPayment = action.payload;
    },
    setChooseHref: (state, action) => {
      state.chooseHref = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTotal.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.total = action.payload.length;
      const total = action.payload.reduce(
        (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
        0
      );
      state.totalItemPayment = total;
    });
  },
});

export const { setOpenPayment, setCartPayment, setChooseHref } =
  CartSlice.actions;

export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCart = (state: RootState) => state.cart.cart;
export const selectOpenPayment = (state: RootState) => state.cart.openPayment;
export const selectItemPayment = (state: RootState) => state.cart.itemPayment;
export const selectTotalItemPayment = (state: RootState) =>
  state.cart.totalItemPayment;
export const selectChooseHref = (state: RootState) => state.cart.chooseHref;

export default CartSlice.reducer;
