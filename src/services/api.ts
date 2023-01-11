import axios from 'axios';

import { loadItem, saveItem } from './storage';

const baseURL = axios.create({
  baseURL: 'https://sparta-hippo.shop/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: `${loadItem('isLogin')}`,
  },
});

const mockURL = axios.create({
  baseURL: 'http://localhost:3003',
});

const MEETINGS = '/meetings';
const LOGIN = '/users/login';

export const getSortbyMeetings = async (keyword: string | null) => {
  const query =
    keyword === 'popular' || keyword === 'new'
      ? `?sortby=${keyword}&category=`
      : `/search?searchBy=${keyword}&category=`;

  const response = await baseURL.get(MEETINGS + query);
  return response;
};

export const getNextMeetings = async ({
  meetingId,
  keyword,
}: {
  meetingId: number;
  keyword: string | null;
}) => {
  const query =
    keyword === 'popular' || keyword === 'new'
      ? `?sortby=${keyword}&category=&meetingId=${meetingId}`
      : `/search?searchBy=${keyword}&category=&meetingId=${meetingId}`;

  const response = await baseURL.get(MEETINGS + query);

  return response.data;
};

export const patchJoinMeeting = async (meetingId: number) => {
  // 추후 patch로 변경
  const response = await mockURL.get(MEETINGS);
  // + `/${meetingId}/attendance`
  return response;
};

export const postLogin = async (userInfo: { email: string; password: string }) => {
  const response = await baseURL.post(LOGIN, userInfo).catch((err) => {
    alert(err.response.data.statusMsg);
    location.reload();
  });

  saveItem('isLogin', response?.headers.authorization as unknown as string);
  location.assign('/main');
};

export const getDetailPage = async (id: any) => {
  // const res = await mockURL.get(MEETINGS_MOCK);
  const res = await baseURL.get(`meetings/${id}`);
  return res;
};

export const getAlarm = async ({ id }: any) => {
  const res = await baseURL.patch(`/meetings/${id}/alarm`);
  console.log(res);
  return res;
};

export const meetingAttend = async (meetingId: any) => {
  const res = await baseURL.patch(`/meetings/${meetingId}/attendance`);
  return res;
};

export const getAttendList = async (meetingId: any) => {
  // const res = await mockURL.get('/attend');
  const res = await baseURL.get(`/meetings/${meetingId}/attendants`); // 위api id랑 같음
  return res;
};

export const getCommentPage = async (meetingId: any) => {
  // const res = await mockURL.get('/comment');
  const res = await baseURL.get(`/meetings/${meetingId}/comments?commentId=`);
  return res;
};

export const addComment = async ({ id, comment }: any) => {
  const res = await baseURL.post(`/meetings/${id}/comments?commentId=`, { comment });
  return res;
};

export const delComment = async ({ id, commetnId }: any) => {
  const res = await baseURL.delete(`/meetings/${id}/comments/${commetnId}`);
  return res;
};
