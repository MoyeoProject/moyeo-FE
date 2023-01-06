import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import KakaoLoginButton from './KakaoLoginButton';

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

  const handleAddtodo = async (state: user) => {
    const { email, password } = state;
    const res = await axios.post('https://sparta-hippo.shop/api/user/login', {
      email: email,
      password: password,
    });
    console.log(res);
    // window.location.href = '/';
  };

  const { mutate } = useMutation(handleAddtodo);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
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
      <KakaoLoginButton />

      {/* <KakaoLoginButton
        // onClick={() => {
        //   window.location.href = KAKAO_AUTH_URL;
        // }}
        <span>카카오 로그인</span>
      </KakaoLoginButton> */}
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
