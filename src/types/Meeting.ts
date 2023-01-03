export type Meeting = {
  id: number;
  masterId: number;
  isMaster: boolean;
  title: string;
  category: string;
  startDate: string;
  startTime: string;
  duration: string;
  platform: string;
  maxNum: number;
  secret: boolean;
  'secret-password': string;
  attend: boolean;
  attendantsNum: number;
  attendantsList: {
    userId: number;
    userProfileImg: string;
  }[];
};
