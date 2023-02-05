import axios from 'axios';
import { FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SignUp } from '../types/AppTypes';
import { MeetingLinkAddType, MemberTypes } from '../types/DetailTypes';
import { EmailAuthType, RePasswordType } from './../types/AppTypes';
import { loadItem, saveItem } from './storage';

const baseURL = axios.create({
  baseURL: 'https://sparta-hippo.shop/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: `${loadItem('isLogin')}`,
  },
});

const LoginbaseURL = axios.create({
  baseURL: 'https://sparta-hippo.shop/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
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
  meetingId: number;
  keyword: string | null;
}) => {
  const query =
    keyword === 'popular' || keyword === 'new'
      ? `?sortby=${loadItem('keyword')}&category=${loadItem('category')}&meetingId=${meetingId}`
      : `/search?searchBy=${loadItem('keyword')}&category=&meetingId=${meetingId}`;

  const response = await baseURL.get(MEETINGS + query);
  return response.data;
};

export const getMyInfo = async () => {
  const response = await baseURL.get(MYPAGE);
  return response;
};

export const getAlarm = async () => {
  const response = await baseURL.get('/alarms/existence');
  return response;
};

export const postMeeting = async (postForm: FieldValues) => {
  const formDataForSubmit = new FormData();

  Object.entries(postForm).forEach((arr) => {
    arr[0] !== 'image'
      ? formDataForSubmit.append(arr[0], arr[1])
      : arr[1] !== null && formDataForSubmit.append(arr[0], arr[1][0]);
  });

  const response = await baseURL
    .post(MEETINGS, formDataForSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      res.data.data && toast(res.data.statusMsg);
      history.back();
    })
    .catch((err) => {
      toast(err.response.data.statusMsg);
    });

  return response;
};

export const getEditingMeeting = async (id: number | undefined) => {
  const response = await baseURL
    .get(MEETINGS + `/${id}/update`)
    .then((res) => {
      saveItem('currPost', JSON.stringify(res?.data.data));
      location.reload();
    })
    .catch((err) => {
      toast(err.response.data.statusMsg);
    });

  return response;
};

export const editMeeting = async ({ id, postForm }: { id: number; postForm: FieldValues }) => {
  const formDataForSubmit = new FormData();

  Object.entries(postForm).forEach((arr) => {
    arr[0] !== 'image'
      ? formDataForSubmit.append(arr[0], arr[1])
      : arr[1] !== null && formDataForSubmit.append(arr[0], arr[1][0]);
  });

  const response = await baseURL
    .patch(MEETINGS + `/${id}`, formDataForSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      toast(res.data.statusMsg);
      history.back();
    })
    .catch((err) => {
      toast(err.response.data.statusMsg);
    });

  return response;
};

export const editMyInfo = async ({
  username,
  profileMsg,
}: {
  username: string;
  profileMsg: string;
}) => {
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

export const deleteMeeting = async ({ id }: { id: number }) => {
  const response = await baseURL.delete(MEETINGS + `/${id}`);
  return response;
};

export const postLogin = async (userInfo: { email: string; password: string }) => {
  await LoginbaseURL.post(LOGIN, userInfo)
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
      saveItem('reviewAdd', '');
      location.assign('/main');
    })
    .catch((err) => {
      toast(err.response.data.statusMsg);
      location.assign('/');
    });
};

export const emailCheckApi = async (email: string) => {
  const res = await baseURL.get(`/users/mail-code/create?email=${email}`);
  return res;
};

export const emailAuthNumberApi = async ({ email, authNumber }: EmailAuthType) => {
  const res = await baseURL.post('/users/mail-code/confirm', {
    email: email,
    ePw: authNumber,
  });
  return res;
};

export const signupApi = async ({ email, password, username }: SignUp) => {
  const res = await baseURL
    .post('/users/signup', { email, password, username })
    .then((res) => {
      toast('회원가입 성공');
      location.replace('/');
    })
    .catch((err) => {
      toast(err.response.data.statusMsg);
    });
};

export const rePasswordApi = async ({ email, password }: RePasswordType) => {
  const res = await baseURL
    .patch('/users/passwordChange', { email, password })
    .then((res) => {
      location.replace('/');
      toast('비밀번호 변경 성공');
    })
    .catch((err) => {
      toast(err.response.data.statusMsg);
    });
};

export const getDetailPage = async (id: string | undefined) => {
  const res = await baseURL.get(`/meetings/${id}`);
  return res;
};

export const editImageApi = async ({ image, id }: any) => {
  const formData = new FormData();
  formData.append('image', image);
  const res = await baseURL.patch(`/meetings/${id}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export const meetAttendExitApi = async (meetingId: any) => {
  const res = await baseURL.patch(`/meetings/${meetingId}/attendance`);
  return res;
};

export const meetEntranceApi = async ({ id, link }: { id: string | undefined; link: string }) => {
  const res = await baseURL
    .patch(`/meetings/${id}/entrance`)
    .then((res) => {
      toast('모임 입장합니다.');
      window.open(`${link}`);
      saveItem('reviewAdd', '');
      location.reload();
    })
    .catch((err) => {
      toast(err.response.data.statusMsg);
    });
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

export const getAlarmApi = async (id: string | undefined) => {
  const res = await baseURL.patch(`/meetings/${id}/alarm`).then((res) => {
    toast(res.data.data ? '알람을 켭니다.' : '알람을 끕니다.');
  });
};

export const getAlarmList = async () => {
  const res = await baseURL.get('/alarms');
  return res;
};

export const AlarmReadApi = async (id: number) => {
  const res = await baseURL.delete(`/alarms/${id}`);
  return res;
};

export const AlarmAllDeleteApi = async () => {
  const res = await baseURL.delete('/alarms');
  return res;
};

export const addReviewApi = async ({ review, id }: { id: string | undefined; review: boolean }) => {
  const res = await baseURL
    .post(`/meetings/${id}/review`, { review })
    .then((res) => {
      saveItem('reviewAdd', 'write_review');
      location.replace(`/detail/${id}`);
    })
    .catch((err) => {
      toast(err.response.data.statusMsg);
    });
};
