const KAKAO_AUTH_URL =
  'https://kauth.kakao.com/oauth/authorize?client_id=ced49bfdb65f5f152e2e43f12e88bd86&redirect_uri=https://sparta-hippo.shop/api/user/kakao/callback&response_type=code';

const KakaoLoginButton = () => {
  return (
    <p
      onClick={() => {
        console.log(KAKAO_AUTH_URL);
      }}
    >
      카카오로그인
    </p>
  );
};

export default KakaoLoginButton;
