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
