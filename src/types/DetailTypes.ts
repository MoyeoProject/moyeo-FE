export type DetailTypes = {
  alarm: boolean;
  attend: boolean;
  category: string;
  content: string;
  duration: number;
  hateNum: number;
  id: number;
  likeNum: number;
  link: string;
  master: boolean;
  masterId: number;
  maxNum: number;
  password: number;
  platform: string;
  secret: boolean;
  startTime: string;
  title: string;
};

export type MemberTypes = {
  followed?: boolean;
  profileUrl?: string;
  userId: number;
  username?: string;
};

export type CommentTypes = {
  commentId: number;
  username: string;
  profileUrl: string;
  comment: string;
  createdAt: string;
  deleted: boolean;
  id?: string | undefined;
  myComment: boolean;
};

export type CommentArray = {
  CommentTypes: [];
};

export type KakaoShareTypes = {
  shareData: [];
};
export type shareData = {
  link: string;
  title: string;
  content: string;
};

export type ParamsId = {
  id: string | null;
};

export type MeetingLinkAddType = {
  link?: string;
  platform: string;
  id: string | undefined;
};

export type AlarmType = {
  id: number;
  content: string;
  isRead: boolean;
  createdAt: string;
};
