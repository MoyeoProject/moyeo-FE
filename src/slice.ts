import { createSlice } from '@reduxjs/toolkit';

import { Meeting } from './types/Meeting';

type AppState = { meetingList: Meeting[] };

export const app = createSlice({
  name: 'app',
  initialState: {
    meetingList: [],
  },
  reducers: {
    setMeetingList: (state: AppState, { payload }) => {
      return {
        meetingList: payload,
      };
    },
  },
});

export const { setMeetingList } = app.actions;

const appReducer = app.reducer;
export default appReducer;
