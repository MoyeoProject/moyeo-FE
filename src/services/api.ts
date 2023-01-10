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

const MEETINGS = '/api/meetings';
const LOGIN = '/api/users/login';

const MEETINGS_MOCK = '/meetings';
const NEXT_MOCK = '/next';

export const getSortbyMeetings = async (keyword: string) => {
  const response = await mockURL.get(MEETINGS_MOCK);
  // + `?sortby=${keyword}&category=`
  return response;
};

export const getSearchMeetings = async (keyword: string) => {
  const response = await mockURL.get(MEETINGS_MOCK);
  // + `/search?searchBy=${keyword}&category=`
  return response;
};

export const patchJoinMeeting = async (meetingId: number) => {
  // 추후 patch로 변경
  const response = await mockURL.get(MEETINGS);
  // + `/${meetingId}/attendance`
  return response;
};

export const getNextMeetings = async (meetingId: number) => {
  const response = await mockURL.get(NEXT_MOCK);
  // + `?meetingId=${meetingId}`
  return response;
};

export const postLogin = async (userInfo: { email: string; password: string }) => {
  const response = await baseURL.post(LOGIN, userInfo).catch((err) => {
    alert(err.response.data.statusMsg);
    location.reload();
  });

  saveItem('isLogin', response?.headers.authorization as unknown as string);
  location.reload();
};

// id는 number로 넘어가야 하는데 에러
export const getDetailPage = async (id: any) => {
  // const res = await mockURL.get(MEETINGS_MOCK);
  const res = await baseURL.get(`meetings/${id}`);
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
  // console.log(res);
  return res;
};

export const addComment = async ({ id, comment }: any) => {
  const res = await baseURL.post(`/meetings/${id}/comments?commentId=`, { comment });
  console.log(res);
  return res;
};

export const delComment = async ({ id, commetnId }: any) => {
  const res = await baseURL.delete(`/meetings/${id}/comments/${commetnId}`);
  console.log(res);
  return res;
};
