import axios from 'axios';

const mockURL = axios.create({
  baseURL: 'http://localhost:3003',
});

// actual '/api/meetings';
const MEETINGS = '/meetings';

export const getSortbyMeetings = async (keyword: string) => {
  const response = await mockURL.get(MEETINGS);
  // + `?sortby=${keyword}&category=`
  return response;
};

export const getSearchMeetings = async (keyword: string) => {
  const response = await mockURL.get(MEETINGS);
  // + `?search=${keyword}`
  return response;
};

export const patchJoinMeeting = async (meetingId: number) => {
  // 추후 patch로 변경
  const response = await mockURL.get(MEETINGS);
  // + `/${meetingId}/attendance`
  return response;
};

// Detail Page
export const getDetailPage = async (id: string) => {
  const res = await mockURL.get(MEETINGS);
  // + `/${id}`
  return res;
};

export const fetchCommentList = async (id: string) => {
  const res = await mockURL.get(MEETINGS);
  // +`/${id}/comments`
  return res;
};
