import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as PasswordNoView } from '../assets/n_eye_false.svg';
import { ReactComponent as PasswordView } from '../assets/n_eye_true.svg';
import { ReactComponent as LoginLogo } from '../assets/n_logo.svg';
import { KAKAO_AUTH_URL } from '../components/KakaoLoginButton';
import LoginButton from '../components/LoginButton';
import { postLogin } from '../services/api';
import { AuthButtonBox, AuthFormBox, Eye, LoginFormBox } from '../styles/LoginFormStyle';
import { LoginInputField } from '../types/AppTypes';

const LoginForm = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = state;
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const mutateLogin = useMutation({
    mutationFn: postLogin,
  });

  const handleClickLogin = ({ email, password }: LoginInputField) => {
    email && password
      ? mutateLogin.mutate({ email, password })
      : toast('이메일과 비밀번호를 확인해주세요.');
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.keyCode == 13) {
      mutateLogin.mutate({ email, password });
    }
  };

  return (
    <LoginFormBox>
      <div className="logoBox">
        <LoginLogo />
      </div>
      <div className="loginBox">
        <AuthFormBox onKeyUp={handleEnterKey}>
          <div className="inputBox">
            <p>이메일</p>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChangeInput}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="inputBox">
            <p>비밀번호</p>
            <input
              type={view ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={onChangeInput}
              placeholder="비밀번호를 입력하세요"
            />
            <Eye
              isSignup={false}
              onClick={() => {
                setView(!view);
              }}
            >
              {view ? <PasswordView /> : <PasswordNoView />}
            </Eye>
          </div>
        </AuthFormBox>
        <AuthButtonBox>
          <LoginButton loginInputField={state} onClickLogin={handleClickLogin} />
          <div className="line">
            <hr />
            <p>또는</p>
            <hr />
          </div>
          <button
            className="kakaoBtn"
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
          >
            카카오톡으로 로그인 하기
          </button>
          <div className="moveText">
            <span
              onClick={() => {
                navigate('/repassword');
              }}
            >
              비밀번호 재설정
            </span>
            <span>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
            <span onClick={() => navigate('/signup')}>회원가입</span>
          </div>
        </AuthButtonBox>
      </div>
    </LoginFormBox>
  );
};

export default LoginForm;
