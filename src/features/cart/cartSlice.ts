import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import { Product } from '@/shared/types/productType';

export interface CartState {
  cart: Product[];
  showShoppingCart: boolean;
  checkoutCart: boolean;
}

const initialStateCart: CartState = {
  cart: [],
  showShoppingCart: false,
  checkoutCart: false,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: initialStateCart,

  reducers: {
    openShoppingCart: (state) => {
      state.showShoppingCart = true;
    },

    closeShoppingCart: (state) => {
      state.showShoppingCart = false;
    },
  },
});

export const selectCart = (state: RootState) => state.cart.cart;
export const selectShowCart = (state: RootState) => state.cart.showShoppingCart;
export const selectCheckCart = (state: RootState) => state.cart.checkoutCart;

export const { openShoppingCart, closeShoppingCart } = CartSlice.actions;

export default CartSlice.reducer;
