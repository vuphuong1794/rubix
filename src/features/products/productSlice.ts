import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

interface InitialState {
  subItemChoose: string;
  subColorChoose: string;
  subPriceChoose: string;
  valueImage: string;
}

const initialState: InitialState = {
  subItemChoose: 'All Categories',
  subColorChoose: '',
  subPriceChoose: '',
  valueImage: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
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
  },
});

export const {
  setSubItemChoose,
  getValueImage,
  setSubColorChoose,
  setSubPriceChoose,
} = productSlice.actions;

export const selectSubItemChoose = (state: RootState) =>
  state.product.subItemChoose;
export const selectSubColorChoose = (state: RootState) =>
  state.product.subColorChoose;
export const selectSubPriceChoose = (state: RootState) =>
  state.product.subPriceChoose;
export const selectValueImage = (state: RootState) => state.product.valueImage;

export default productSlice.reducer;
