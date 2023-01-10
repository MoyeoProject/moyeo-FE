import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { isSignup } from '../modules/authSlice';
import { postLogin } from '../services/api';
import { useAppDispatch } from '../store';
import { LoginInputField } from '../types/AppTypes';
import { KAKAO_AUTH_URL } from './KakaoLoginButton';
import LoginButton from './LoginButton';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    email && password ? mutateLogin.mutate({ email, password }) : alert('값을 입력해주세요!');
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.keyCode == 13) {
      mutateLogin.mutate({ email, password });
    }
  };

  return (
    <>
      <h2>로그인</h2>
      <form onKeyUp={handleEnterKey}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChangeInput}
          placeholder="이메일작성"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChangeInput}
          placeholder="password"
        />
      </form>
      <LoginButton loginInputField={state} onClickLogin={handleClickLogin} />
      <div
        onClick={() => {
          window.location.href = KAKAO_AUTH_URL;
        }}
      >
        카카오 로그인 하기
      </div>
      <button
        onClick={() => {
          dispatch(isSignup(true));
        }}
      >
        회원가입 하러 가기
      </button>
    </>
  );
};

export default LoginForm;
