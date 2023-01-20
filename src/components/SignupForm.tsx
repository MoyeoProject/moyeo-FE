import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { isSignup } from '../modules/authSlice';
import { useAppDispatch } from '../store';
import { KAKAO_AUTH_URL } from './KakaoLoginButton';

type SignUp = {
  email: string;
  authNumber: string;
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
  const [authNumber, setAuthNumber] = useState<SignUp['authNumber']>('');
  const [username, setUsername] = useState<SignUp['username']>('');
  const [password, setPassword] = useState<SignUp['password']>('');
  const [passwordCheck, setPasswordCheck] = useState<SignUp['passwordCheck']>('');

  const [emailAuth, setEmailAuth] = useState<SignUp['emailAuth']>(false);

  // 이메일 확인
  const emailCheckApi = async (email: any) => {
    axios
      .post('https://reqres.in/api/register', email)
      .then((res) => {
        alert('이메일 인증번호를 적어주세요.');
      })
      .catch((err) => {
        alert('이메일 주소를 확인해주세요.');
      });
  };

  const handleEmailCheck = () => {
    const mock = { email: 'eve.holt@reqres.in', password: 'cityslicka' };
    emailCheckApi(mock);
  };

  // 이메일 인증번호 확인 (post로 요청보내야함.)
  const emailAuthApi = async (authNumber: any) => {
    axios
      .get('http://localhost:3003/authCheck')
      .then((res) => {
        setEmailAuth(true);
      })
      .catch((err) => {
        alert('인증번호가 틀렸습니다.');
        setEmailAuth(false);
      });
  };
  const handleClickEamilAuth = () => {
    emailAuthApi({ authNumber });
  };

  // 회원가입
  const signupApi = async (signupUser: { email: string; password: string }) => {
    // const signupApi = async (signupUser: { email: string; username: string; password: string }) => {
    await axios
      .post('https://reqres.in/api/register', signupUser)
      .then((res) => {
        // window.location.href = '/';
      })
      .catch((err) => {
        alert('회원가입 실패.');
      });
  };

  const handleClickSignup = () => {
    const signupUser = {
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    };
    // const signupUser = {
    //   email: 'eve.holt@reqres.in',
    //   username: username,
    //   password: 'pistol',
    // };
    signupApi(signupUser);
  };

  return (
    <>
      <h2>회원가입</h2>
      <Box>
        <div>
          <label>이메일 </label>
          <input
            type="email"
            value={email || ''}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="이메일을 입력하세요"
          />
          <button onClick={handleEmailCheck}>이메일 확인</button>
        </div>
        <div></div>
        <div>
          <label>이메일 인증 </label>
          <input
            type="text"
            placeholder="인증코드를 입력하세요"
            onChange={(e) => {
              setAuthNumber(e.target.value);
            }}
          />
          <button onClick={handleClickEamilAuth}>인증하기</button>
        </div>
        <div>
          <label>비밀번호 </label>
          <input
            type="password"
            value={password || ''}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 작성해 주세요"
          />
        </div>
        <div>
          <label>비밀번호 확인 </label>
          <input
            type="password"
            value={passwordCheck || ''}
            onChange={(e) => {
              setPasswordCheck(e.target.value);
            }}
            placeholder="비밀번호를 확인 주세요"
          />
        </div>
        <div>
          <label>닉네임 </label>
          <input
            type="text"
            value={username || ''}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="user의 name을 작성해주세요"
          />
        </div>
        <button onClick={handleClickSignup}>회원가입</button>
      </Box>
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
const Box = styled.div`
  border: 1px solid red;
  width: 370px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  input {
    height: 40px;
    margin-bottom: 10px;
  }
`;

export default SignUpForm;
