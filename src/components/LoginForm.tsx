import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { KAKAO_AUTH_URL } from './KakaoLoginButton';

const LoginForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = state;
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  type user = {
    email: string;
    password: string;
  };

  const handleLogin = async (state: user) => {
    const { email, password } = state;
    const res = await axios.post('https://sparta-hippo.shop/api/users/login', {
      email: email,
      password: password,
    });
    // window.location.href = '/';
    // success / Error처리 안함
  };

  const { mutate } = useMutation(handleLogin);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(state);
    setState({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">로그인</button>
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
          navigate('/signup');
        }}
      >
        회원가입 하러 가기
      </button>
    </>
  );
};

export default LoginForm;
