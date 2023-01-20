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
  userId?: number;
  username?: string;
};

export type CommentTypes = {
  commentId: number;
  username: string;
  profileUrl: string;
  comment: string;
  createdAt: string;
  deleted: boolean;
  id?: string;
  myComment?: boolean;
};

export type ShareDataTypes = {
  link: string;
  title: string;
  content: string;
};

export type ParamsId = {
  id: string;
};

export type MeetingLinkAddType = {
  link?: string;
  platform: string;
  id: string;
};
