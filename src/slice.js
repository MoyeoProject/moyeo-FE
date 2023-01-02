import { createSlice } from '@reduxjs/toolkit';

// import {[thunk함수이름]} from './thunk';

export const app = createSlice({
  name: 'app',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder;
    // thunk함수이름에 대한 케이스 추가 => 리액트 쿼리 사용하면 필요없음
  },
});

// export const {} = app.actions;

const appReducer = app.reducer;
export default appReducer;
