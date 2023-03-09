import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

interface InitialState {
  isHover: boolean;
  keyRef?: string;
}

const initialState: InitialState = {
  isHover: true,
  keyRef: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    inHover: (state) => {
      state.isHover = true;
    },
    outHover: (state) => {
      state.isHover = false;
    },
    getKeyRef: (state, action) => {
      state.keyRef = action.payload;
    },
  },
});

export const { inHover, outHover, getKeyRef } = productSlice.actions;

export const selectIsHover = (state: RootState) => state.product.isHover;
export const selectKeyRef = (state: RootState) => state.product.keyRef;

export default productSlice.reducer;
