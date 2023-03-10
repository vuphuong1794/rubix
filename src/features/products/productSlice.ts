import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

interface InitialState {
  subItemChoose: string;
  subColorChoose: string;
  valueImage: string;
}

const initialState: InitialState = {
  subItemChoose: '',
  subColorChoose: '',
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

    getValueImage: (state, action) => {
      state.valueImage = action.payload;
    },
  },
});

export const { setSubItemChoose, getValueImage, setSubColorChoose } =
  productSlice.actions;

export const selectSubItemChoose = (state: RootState) =>
  state.product.subItemChoose;
export const selectSubColorChoose = (state: RootState) =>
  state.product.subColorChoose;
export const selectValueImage = (state: RootState) => state.product.valueImage;

export default productSlice.reducer;
