import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

interface InitialState {
  activeLabel: string;
}

const initialState: InitialState = {
  activeLabel: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    toggle: (state, action) => {
      state.activeLabel = action.payload;
    },
  },
});

export const { toggle } = authSlice.actions;

export const selectIndexActive = (state: RootState) => state.auth.activeLabel;

export default authSlice.reducer;
