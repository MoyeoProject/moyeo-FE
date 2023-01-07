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

// 리듀서의 type지정해주기
// 상태type과 상태 초기값 선언
// 스토어에서 리듀서 타입지정해주기.zz 진행안됨
