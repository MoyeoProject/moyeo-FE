import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types/AppTypes';

export const app = createSlice({
  name: 'app',
  initialState: {
    sortbyKeyword: '',
    meetingList: [],
    currPageSize: 0,
  },
  reducers: {
    setMeetingList: (state: InitialState, { payload }) => {
      const { meetingList, sortbyKeyword } = payload;
      return {
        ...state,
        sortbyKeyword,
        meetingList,
      };
    },
    addMeetingList: (state: InitialState, { payload: { meetingList } }) => {
      state.meetingList = [...state.meetingList, ...meetingList];
    },
    addCurrPageSize: (state: InitialState, { payload }) => {
      state.currPageSize = payload;
    },
  },
});

export const { setMeetingList, addMeetingList, addCurrPageSize } = app.actions;

const appReducer = app.reducer;
export default appReducer;
