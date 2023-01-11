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
  await baseURL
    .post(LOGIN, userInfo)
    .then((res) => {
      saveItem('isLogin', res?.headers.authorization as unknown as string);
      saveItem('keyword', 'popular');
      location.assign('/main');
    })
    .catch((err) => {
      alert(err.response.data.statusMsg);
      location.assign('/');
    });
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
