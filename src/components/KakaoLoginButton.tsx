import axios from 'axios';
import { useEffect } from 'react';

const baseURL = axios.create({
  baseURL: 'https://sparta-hippo.shop/api',
});

// const CLIENT_ID = '' + process.env.REACT_APP_KAKAO_CLIENT_ID;
// const REDIRECT_URL = '' + process.env.REACT_APP_KAKAO_REDIRECT_URL;

const CLIENT_ID = 'ced49bfdb65f5f152e2e43f12e88bd86';
const REDIRECT_URL = 'http://localhost:3000/api/users/kakao/callback';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;

const setAccessToken = (accessToken: any) => {
  localStorage.setItem('isLogin', accessToken);
};

const kakaoLogin = (code: string | null) => {
  baseURL
    .get(`users/kakao/callback?code=${code}`)
    .then((res) => {
      const accessToken = res.headers.authorization;
      setAccessToken(accessToken);
      localStorage.setItem('username', res.data.data.username);
      localStorage.setItem('profileUrl', res.data.data.profileUrl);
      // window.location.href = '/main';
    })
    .catch((err: any) => {
      window.alert('로그인에 실패하였습니다.');
      console.log(err);
      // window.location.href = '/';
    });
};

const KakaoLoginButton = () => {
  // 인가코드
  const code: string | null = new URL(window.location.href).searchParams.get('code');
  kakaoLogin(code);
  return <div>카카오 로그인 처리중...</div>;
};

export default KakaoLoginButton;
