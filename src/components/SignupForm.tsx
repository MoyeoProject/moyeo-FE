import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { isSignup } from '../modules/authSlice';
import { useAppDispatch } from '../store';
import { KAKAO_AUTH_URL } from './KakaoLoginButton';

type SignUp = {
  email: string;
  username: string;
  password: string;
  passwordCheck?: string;
  emailAuth?: boolean;
  hidePassword?: boolean;
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<SignUp['email']>('');
  const [username, setUsername] = useState<SignUp['username']>('');
  const [password, setPassword] = useState<SignUp['password']>('');
  const [passwordCheck, setPasswordCheck] = useState<SignUp['passwordCheck']>('');

  const [emailAuth, setEmailAuth] = useState<SignUp['emailAuth']>(false);
  const [hidePassword, setHidePassword] = useState<SignUp['hidePassword']>(false);

  // 이메일 확인
  const emailAuthApi = async (email: any) => {
    console.log(email);
  };

  const handleEmailCheck = () => {
    console.log(email);
    setEmailAuth(true);
  };

  // 회원가입
  const handleClickSignup = () => {
    console.log(emailAuth, email, username, password, passwordCheck);
  };

  return (
    <>
      <h2>회원가입</h2>
      <div>
        <input
          type="email"
          value={email || ''}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="이메일작성"
        />
        <button onClick={handleEmailCheck}>이메일 확인</button>
        {/* email 인증번호 모달 구현? 부분 */}
        {/* <div style={{ border: '1px solid black' }}>
          <p>이메일로 온 인증번호를 입력해주세요</p>
          <div>
            <input type={hidePassword ? 'password' : 'text'} />
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setHidePassword(!hidePassword);
              }}
            >
              👌
            </span>
            <button>인증확인</button>
            <span>시간설정? 몇분안에 하세요 </span>
          </div>
        </div> */}

        <input
          type="text"
          value={username || ''}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="user의 name을 작성해주세요"
        />
        <input
          type="password"
          value={password || ''}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호를 작성해 주세요"
        />
        <input
          type="password"
          value={passwordCheck || ''}
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
          placeholder="비밀번호를 확인 주세요"
        />
        <button onClick={handleClickSignup}>회원가입</button>
      </div>
      <div
        onClick={() => {
          window.location.href = KAKAO_AUTH_URL;
        }}
      >
        카카오 로그인 하기
      </div>
      <button
        onClick={() => {
          dispatch(isSignup(false));
        }}
      >
        로그인 하러 가기
      </button>
    </>
  );
};

export default SignUpForm;
