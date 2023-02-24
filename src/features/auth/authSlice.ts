import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

interface InitialState {
  isChoose: boolean;
}

const initialState: InitialState = {
  isChoose: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.isChoose = true;
    },
    register: (state) => {
      state.isChoose = false;
    },
  },
});

export const { login, register } = authSlice.actions;

export const selectIsChoose = (state: RootState) => state.auth.isChoose;

export default authSlice.reducer;
