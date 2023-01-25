import { createSlice } from '@reduxjs/toolkit';

export type IsState = {
  isSignUp: boolean;
  isMaster: boolean;
  detaiCategory: string;
};

const initialState = {
  isSignUp: false,
  isMaster: false,
  detaiCategory: 'intro',
};

const authSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    isSignup: (state: IsState, action) => {
      state.isSignUp = action.payload;
    },
    isMaster: (state: IsState, action) => {
      state.isMaster = action.payload;
    },
    detaiCategory: (state: IsState, action) => {
      state.detaiCategory = action.payload;
    },
  },
});

export const { isSignup, isMaster } = authSlice.actions;

const isSignupReducer = authSlice.reducer;
export default isSignupReducer;
