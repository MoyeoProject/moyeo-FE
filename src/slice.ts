import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types/AppTypes';

export const app = createSlice({
  name: 'app',
  initialState: {
    sortbyKeyword: '',
    meetingList: [],
  },
  reducers: {
    setMeetingList: (state: InitialState, { payload }) => {
      const { meetingList, sortbyKeyword } = payload;
      return {
        sortbyKeyword,
        meetingList,
      };
    },
  },
});

export const { setMeetingList } = app.actions;

const appReducer = app.reducer;
export default appReducer;
