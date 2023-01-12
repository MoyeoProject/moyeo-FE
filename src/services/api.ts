import axios from 'axios';

import { loadItem, saveItem } from './storage';

const baseURL = axios.create({
  baseURL: 'https://sparta-hippo.shop/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: `${loadItem('isLogin')}`,
  },
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
  const response = await baseURL
    .patch(MEETINGS + `/${meetingId}/attendance`)
    .then((res) => {
      res.data.data ? alert('참석완!') : alert('취소완!');
      location.reload();
    })
    .catch((err) => {
      alert(err.response.data.statusMsg);
      location.reload();
    });

  return response;
};

export const postLogin = async (userInfo: { email: string; password: string }) => {
  await baseURL
    .post(LOGIN, userInfo)
    .then((res) => {
      saveItem('isLogin', res?.headers.authorization as unknown as string);
      saveItem('keyword', 'popular');
      saveItem('userId', res.data.data.id);
      saveItem('username', res.data.data.username);
      saveItem('profileUrl', res.data.data.profileUrl);
      location.assign('/main');
    })
    .catch((err) => {
      alert(err.response.data.statusMsg);
      location.assign('/');
    });
};

export const getDetailPage = async (id: any) => {
  // const res = await mockURL.get(MEETINGS_MOCK);
  const res = await baseURL.get(`meetings/${id}`);
  return res;
};

export const getAlarmApi = async (id: any) => {
  const res = await baseURL.patch(`/meetings/${id}/alarm`);
  return res;
};

export const meetAttendExitApi = async (meetingId: any) => {
  const res = await baseURL.patch(`/meetings/${meetingId}/attendance`);
  return res;
};

export const getAttendList = async (meetingId: any) => {
  // const res = await mockURL.get('/attend');
  const res = await baseURL.get(`/meetings/${meetingId}/attendants`);
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
