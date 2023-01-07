import axios from 'axios';
import { useEffect } from 'react';

export const KAKAO_AUTH_URL =
  'https://kauth.kakao.com/oauth/authorize?client_id=ced49bfdb65f5f152e2e43f12e88bd86&redirect_uri=http://localhost:3000/api/users/kakao/callback&response_type=code';

const setAccessToken = (accessToken: any) => {
  localStorage.setItem('isLogin', accessToken);
};

const kakaoLogin = (code: string | null) => {
  axios
    .get(`https://sparta-hippo.shop/api/users/kakao/callback?code=${code}`)
    .then((res) => {
      const accessToken = res.headers.authorization;
      setAccessToken(accessToken);
      window.location.href = '/main';
      // 요청이 2번일어나서 화면을 바꿔주지 않으면 아래 에러도 같이 출력됨.
    })
    .catch((err: any) => {
      window.alert('로그인에 실패하였습니다.');
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
