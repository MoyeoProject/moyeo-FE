import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from '../types/AppTypes';

export const home = createSlice({
  name: 'home',
  initialState: {
    meetingList: [],
  },
  reducers: {
    setMeetingList: (state: InitialState, { payload: { data } }) => {
      const { meetingList } = data;
      return {
        ...state,
        meetingList,
      };
    },
    addMeetingList: (state: InitialState, { payload }) => {
      state.meetingList = [...state.meetingList, ...payload];
    },
  },
});

export const { setMeetingList, addMeetingList } = home.actions;

const homeReducer = home.reducer;
export default homeReducer;
