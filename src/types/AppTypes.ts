export type Meeting = {
  id: number;
  masterId: number;
  master: boolean;
  title: string;
  content: string;
  category: string;
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

export type InitialState = { meetingList: Meeting[] };

export type LoginInputField = { email: string; password: string };

export type AppState = { home: InitialState };
