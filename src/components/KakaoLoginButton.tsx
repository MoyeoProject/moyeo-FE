import axios from 'axios';
import { useEffect } from 'react';

export const KAKAO_AUTH_URL =
  'https://kauth.kakao.com/oauth/authorize?client_id=ced49bfdb65f5f152e2e43f12e88bd86&redirect_uri=http://localhost:3000/api/users/kakao/callback&response_type=code';

const setAccessToken = (accessToken: any) => {
  localStorage.setItem('is_login', accessToken);
};

const kakaoLogin = (code: string | null) => {
  console.log(code);
  axios
    .get(`https://sparta-hippo.shop/api/users/kakao/callback?code=${code}`)
    .then((res) => {
      console.log(res);
      // console.log(res.headers.authorization); // 토큰이 넘어올 것임
      // const accessToken = res.headers.authorization;
      // setAccessToken(accessToken);

      // window.location.href = '/main'; // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
    })
    .catch((err: any) => {
      console.log('소셜로그인 에러', err);
      // window.alert('로그인에 실패하였습니다.');
      // window.location.href = '/'; // 로그인 실패하면 로그인화면으로 돌려보냄
    });
  //   };
};

const KakaoLoginButton = () => {
  // 인가코드
  console.log('호출 직전!!!');
  const code: string | null = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  kakaoLogin(code);
  return <div>카카오 로그인 처리중...</div>;
};

export default KakaoLoginButton;
