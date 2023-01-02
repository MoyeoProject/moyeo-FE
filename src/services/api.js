import axios from 'axios';

// import { loadItem } from './storage';

// 아래는 임시로 사용할 mockURL
const mockURL = axios.create({
  baseURL: 'http://localhost:3003',
});

const baseURL = axios.create({
  baseURL: '',
  headers: {
    'Access-Control-Allow-Origin': '*',
    // Authorization: `${loadItem('success')}`,
  },
});

// url 상수
// const POSTS = '/api/posts'; // 전체 게시글

// 게시글 전체 조회
export const getPosts = async () => {
  const response = await mockURL.get();
  return response;
};
