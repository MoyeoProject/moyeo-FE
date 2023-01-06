import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { KAKAO_AUTH_URL } from './KakaoLoginButton';

const SignUpForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [username, setUsername] = useState('');

  const [emailAuthentication, setEmailAuthentication] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  const handleEmailCheck = (e: any) => {
    console.log(email);
    e.preventDefault();
    if (email === '') {
      alert('이메일을 입력해주세요');
      return;
    }
    const expEmailText =
      // eslint-disable-next-line max-len
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!expEmailText.test(email)) {
      alert('@를 포함한 이메일 형식을 맞춰주세요.');
    }

    const emailAuth = async (email: string) => {
      const res = await axios.post(
        `https://sparta-hippo.shop/api/users/emailCertification?email=${email}`
      );
      console.log(res);
    };
    const { mutate } = useMutation(emailAuth);
    console.log(mutate);
    // matate에 emailcheck의 결과가 나오겠지?
    // 내가 서버에 유저 이메일 넘김 - 서버는 이메일 체크 후
    // T) FE에게 확인 코드 쿠키로 보냄 + 사용자 이메일로 확인코드 보냄 // F) Error
    // FR가 사용자 확인코드를 확인할 것인지, 백엔드에 다시 요청할 것인지 미정
    // 이메일 인증여부 check setEmailAuthentication()
  };

  type user = {
    email: string;
    username: string;
    password: string;
  };

  const handleSignup = async (signupUser: user) => {
    const { email, password, username } = signupUser;
    const res = await axios.post('https://sparta-hippo.shop/api/users/login', {
      email: email,
      username: username,
      password: password,
    });
    // window.location.href = '/';
    // success / Error처리 어디서? 조금 더 공부.
  };

  const { mutate, isSuccess, isError } = useMutation(handleSignup);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === '') {
      alert('username을 작성해주세요');
      return;
    }
    if (password !== passwordCheck) {
      alert('비밀번호를 한번 더 확인해주세요');
      return;
    }
    const newList = {
      email: email,
      username: username,
      password: password,
    };
    mutate(newList);
  };

  return (
    <>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
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
        <div style={{ border: '1px solid black' }}>
          <p>이메일로 온 인증번호를 입력해주세요</p>
          <p>
            <input type={hidePassword ? 'password' : 'text'} />
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setHidePassword(!hidePassword);
              }}
            >
              👌
            </span>
          </p>
        </div>

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
        <button type="submit">회원가입</button>
      </form>
      <div
        onClick={() => {
          window.location.href = KAKAO_AUTH_URL;
        }}
      >
        카카오 로그인 하기
      </div>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        로그인 하러 가기
      </button>
    </>
  );
};

export default SignUpForm;
