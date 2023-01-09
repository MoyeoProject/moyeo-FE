import { createSlice } from '@reduxjs/toolkit';

type IsState = { isSignUp: boolean };

const initialState = {
  isSignUp: false,
};

const signupSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    isSignup: (state: IsState, action) => {
      state.isSignUp = action.payload;
    },
  },
});

export const { isSignup } = signupSlice.actions;

const isSignupReducer = signupSlice.reducer;
export default isSignupReducer;
