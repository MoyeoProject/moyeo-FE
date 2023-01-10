export type DetailTypes = {
  id: number;
  masterId: number;
  master: boolean;
  title: string;
  category: string;
  startDate: string;
  startTime: string;
  duration: string;
  platform: string;
  link: string | null;
  content: string;
  maxNum: number;
  secret: boolean;
  password: number | null;
  attend: boolean;
  alarm: boolean;
  likenum: number;
  hatenum: number;
  children?: JSX.Element | JSX.Element[];
};

export type MemberTypes = {
  followed: boolean;
  profileUrl: string;
  userId: number;
  username: string;
};

export type CommentTypes = {
  commentId: number;
  username: string;
  profileUrl: string;
  comment: string;
  createdAt: string;
  deleted: boolean;
};
