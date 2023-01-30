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
const MYPAGE = '/users/mypage';
const PROFILE = '/users/profile';
const PROFILE_URL = '/users/profile-url';

export const getSortbyMeetings = async (keyword: string | null) => {
  const query =
    keyword === 'popular' || keyword === 'new'
      ? `?sortby=${loadItem('keyword')}&category=${loadItem('category')}`
      : keyword === 'calendar'
      ? `/mine?year=${loadItem('year')}&month=${loadItem('month')}`
      : `/search?searchBy=${loadItem('keyword')}&category=${loadItem('category')}`;

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
      ? `?sortby=${loadItem('keyword')}&category=&meetingId=${meetingId}`
      : `/search?searchBy=${loadItem('keyword')}&category=&meetingId=${meetingId}`;

  const response = await baseURL.get(MEETINGS + query);
  return response.data;
};

export const getMyInfo = async () => {
  const response = await baseURL.get(MYPAGE);
  return response;
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

const alarmSubscribeApi = async () => {
  const id = loadItem('userId');
  const subscribeUrl = `https://sparta-hippo.shop/api/alarm/subscribe/${id}`;
  if (loadItem('isLogin') != null) {
    const eventSource = new EventSource(subscribeUrl);

    eventSource.addEventListener('sse', (e) => {
      console.log('알람연결 성공', e.data);
      alert(e.data);
    });

    eventSource.addEventListener('error', function (event) {
      eventSource.close();
    });
  }
};

export const editMyInfo = async ({
  username,
  profileMsg,
}: {
  username: string;
  profileMsg: string;
}) => {
  console.log(username, profileMsg);

  const response = await baseURL.patch(PROFILE, { username, profileMsg });
  return response;
};

export const editMyProfile = async (formData: object) => {
  const response = await baseURL.patch(PROFILE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const deleteMyProfile = async () => {
  const response = await baseURL.delete(PROFILE_URL);
  return response;
};

export const postLogin = async (userInfo: { email: string; password: string }) => {
  await baseURL
    .post(LOGIN, userInfo)
    .then((res) => {
      saveItem('isLogin', res?.headers.authorization as unknown as string);
      saveItem('detailKeyword', 'intro');
      saveItem('userId', res.data.data.id);
      saveItem('username', res.data.data.username);
      saveItem('profileUrl', res.data.data.profileUrl);
      saveItem('keyword', 'popular');
      saveItem('category', '');
      saveItem('year', '');
      saveItem('month', '');
      // alarmSubscribeApi();
      location.assign('/main');
    })
    .catch((err) => {
      alert(err.response.data.statusMsg);
      location.assign('/');
    });
};

export const emailCheckApi = async (email: string) => {
  const res = await baseURL.get(`/users/mail-code/create?email=${email}`);
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
  const res = await baseURL.get(`/meetings/${id}`);
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
  const res = await baseURL.get(`/meetings/${meetingId}/comments`);
  return res;
};

export const addComment = async ({ id, comment }: { id: string | undefined; comment: string }) => {
  const res = await baseURL.post(`/meetings/${id}/comments`, { comment });
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

export const getFollowingList = async () => {
  const res = await baseURL.get('/follow/followingList');
  return res;
};

export const getFollowerList = async () => {
  const res = await baseURL.get('/follow/followerList');
  return res;
};

export const getAlarmList = async () => {
  const res = await baseURL.get('/alarms');
  return res;
};
