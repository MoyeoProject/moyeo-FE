import { createSlice } from '@reduxjs/toolkit';

export type IsState = { isSignUp: boolean };

const initialState = {
  isSignUp: false,
};

const authSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    isSignup: (state: IsState, action) => {
      state.isSignUp = action.payload;
    },
  },
});

export const { isSignup } = authSlice.actions;

const isSignupReducer = authSlice.reducer;
export default isSignupReducer;
