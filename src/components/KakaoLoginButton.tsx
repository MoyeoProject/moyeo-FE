import axios from 'axios';
import Lottie from 'lottie-react';
import toast from 'react-hot-toast';

import loading from '../assets/loading.json';
import { saveItem } from '../services/storage';
import { Loading } from '../styles/LoadingStyle';

const baseURL = axios.create({
  baseURL: 'https://sparta-hippo.shop/api',
});

const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const REDIRECT_URL = process.env.REACT_APP_KAKAO_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;

const setAccessToken = (accessToken: string | undefined) => {
  if (accessToken) {
    localStorage.setItem('isLogin', accessToken);
  }
};

const kakaoLogin = (code: string | null) => {
  baseURL
    .get(`users/kakao/callback?code=${code}`)
    .then((res) => {
      const accessToken = res.headers.authorization;
      setAccessToken(accessToken);
      saveItem('detailKeyword', 'intro');
      saveItem('userId', res.data.data.id);
      saveItem('username', res.data.data.username);
      saveItem('profileUrl', res.data.data.profileUrl);
      saveItem('keyword', 'popular');
      saveItem('category', '');
      saveItem('year', '');
      saveItem('month', '');
      window.location.href = '/main';
    })
    .catch((err) => {
      toast('로그인에 실패하였습니다.');
      window.location.href = '/';
    });
};

const KakaoLoginButton = () => {
  // 인가코드
  const code: string | null = new URL(window.location.href).searchParams.get('code');
  kakaoLogin(code);
  return (
    <div>
      <Loading>
        <Lottie animationData={loading} />
      </Loading>
    </div>
  );
};

export default KakaoLoginButton;
