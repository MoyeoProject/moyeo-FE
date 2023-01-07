export type Meeting = {
  id: number;
  masterId: number;
  master: boolean;
  title: string;
  category: string;
  startDate: string;
  startTime: string;
  duration: string;
  platform: string;
  maxNum: number;
  secret: boolean;
  password: string;
  attend: boolean;
  attendantsNum: number;
  attendantsList: {
    userId: number;
    userProfileImg: string;
  }[];
};

export type InitialState = { sortbyKeyword: string; meetingList: Meeting[]; currPageSize: number };

export type LoginInputField = { email: string; password: string };

export type AppState = { appReducer: InitialState };
