import axios from 'axios';
import { useEffect } from 'react';

export const KAKAO_AUTH_URL =
  'https://kauth.kakao.com/oauth/authorize?client_id=ced49bfdb65f5f152e2e43f12e88bd86&redirect_uri=http://localhost:3000/api/users/kakao/callback&response_type=code';

const KakaoLoginButton = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log('9', code);

  useEffect(() => {
    try {
      const getToken = async () => {
        const data = await axios.get(
          `https://sparta-hippo.shop/api/users/kakao/callback?code=${code}`
        );
        localStorage.setItem('id', data.data.data.jwtToken);
        console.log(data);
        return data;
      };
      getToken().then(() => window.location.assign('/home'));
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <>카카오 리다이렉트 페이지에서 data 확인하고 다음 처리하기</>;
};

export default KakaoLoginButton;

// 캐싱되는 이유 // 리액트쿼리 캐싱 무효화.
// 304 에러
