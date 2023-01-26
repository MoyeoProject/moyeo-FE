import axios from 'axios';
import { FieldValues } from 'react-hook-form';

import { SignUp } from '../types/AppTypes';
import { MeetingLinkAddType, MemberTypes } from '../types/DetailTypes';
import { loadItem, removeItem, saveItem } from './storage';

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
      ? `?sortby=${loadItem('keyword')}&category=${loadItem('category')}`
      : `/search?searchBy=${loadItem('keyword')}&category=${loadItem('category')}`;

  const response = await baseURL.get(MEETINGS + query);
  return response;
};

export const getMyList = async () => {
  const query = `/mine?year=${loadItem('year')}&month=${loadItem('month')}`;
  const response = await baseURL.get(MEETINGS + query);
  return response;
};

export const getNextMeetings = async ({
  meetingId,
  keyword,
}: {
  meetingId: number | false;
  keyword: string | null;
}) => {
  const query =
    keyword === 'popular' || keyword === 'new'
      ? `?sortby=${keyword}&category=&meetingId=${meetingId}`
      : `/search?searchBy=${keyword}&category=&meetingId=${meetingId}`;

  const response = await baseURL.get(MEETINGS + query);

  return response.data;
};

export const postMeeting = async (postForm: FieldValues) => {
  const response = await baseURL
    .post(MEETINGS, postForm)
    .then((res) => {
      res.data.data && alert(res.data.statusMsg);
      history.back();
    })
    .catch((err) => {
      alert(err.response.data.statusMsg);
    });

  return response;
};

export const getEditingMeeting = async (id: number) => {
  const response = await baseURL
    .get(MEETINGS + `/${id}/update`)
    .then((res) => {
      saveItem('currPost', JSON.stringify(res?.data.data));
      location.reload();
    })
    .catch((err) => {
      alert(err.response.data.statusMsg);
    });

  return response;
};

export const editMeeting = async ({ id, postForm }: { id: number; postForm: FieldValues }) => {
  const response = await baseURL
    .patch(MEETINGS + `/${id}`, postForm)
    .then((res) => {
      alert(res.data.statusMsg);
      removeItem('currPost');
      history.back();
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
      saveItem('category', '');
      saveItem('detailKeyword', 'intro');
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

export const emailCheckApi = async (email: string) => {
  const res = await baseURL.get(`users/mail-code/create?email=${email}`);
  return res;
};

export const emailAuthNumberApi = async ({
  email,
  authNumber,
}: {
  email: string;
  authNumber: string;
}) => {
  console.log(email, authNumber);
  // 타입찾기
  // const res = await baseURL.get(`users/mail-code/confirm?&ePw=${authNumber}`, {
  //   email,
  //   ePw: authNumber,
  // });
  // console.log(res);
  // return res;
};

export const signupApi = async ({ email, password, username }: SignUp) => {
  const res = await baseURL.post('/users/signup', { email, password, username });
  return res;
};

export const getDetailPage = async (id: string | undefined) => {
  const res = await baseURL.get(`meetings/${id}`);
  return res;
};
export const getAlarmApi = async (id: string | undefined) => {
  const res = await baseURL.patch(`/meetings/${id}/alarm`);
  return res;
};

export const meetAttendExitApi = async (meetingId: any) => {
  const res = await baseURL.patch(`/meetings/${meetingId}/attendance`);
  return res;
};

export const getAttendList = async (meetingId: string | undefined) => {
  const res = await baseURL.get(`/meetings/${meetingId}/attendants`);
  return res;
};
export const getCommentPage = async (meetingId: string | undefined) => {
  const res = await baseURL.get(`/meetings/${meetingId}/comments?commentId=`);
  return res;
};

export const addComment = async ({ id, comment }: { id: string | undefined; comment: string }) => {
  const res = await baseURL.post(`/meetings/${id}/comments?commentId=`, { comment });
  return res;
};

export const delelteComment = async ({
  id,
  commentId,
}: {
  id: string | undefined;
  commentId: number;
}) => {
  const res = await baseURL.delete(`/meetings/${id}/comments/${commentId}`);
  return res;
};

export const meetingLinkInpitApi = async ({ platform, link, id }: MeetingLinkAddType) => {
  const res = await baseURL.patch(`/meetings/${id}/link`, { platform, link });
  return res;
};

export const makeFollowApi = async ({ userId }: MemberTypes) => {
  const res = await baseURL.post(`/follow/${userId}`);
  return res;
};

export const memberOutApi = async ({
  meetingId,
  userId,
}: {
  meetingId: string | undefined;
  userId: number;
}) => {
  const res = await baseURL.post(`/meetings/${meetingId}/drop/${userId}`);
  return res;
};
