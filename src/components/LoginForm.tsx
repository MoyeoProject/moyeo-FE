import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    <LoginFormBox>
      <div>
        <InputFormBox onKeyUp={handleEnterKey}>
          <div className="inputBox">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChangeInput}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="inputBox">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChangeInput}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </InputFormBox>
        <ButtonBox>
          <LoginButton loginInputField={state} onClickLogin={handleClickLogin} />
          <div className="line">
            <hr />
            <p>또는</p>
            <hr />
          </div>
          <button
            onClick={() => {
              window.location.href = KAKAO_AUTH_URL;
            }}
          >
            카카오 로그인 하기
          </button>
          <div className="moveText">
            <span>비밀번호 재설정</span>
            <span> | </span>
            <span
              onClick={() => {
                dispatch(isSignup(true));
              }}
            >
              회원가입
            </span>
          </div>
        </ButtonBox>
      </div>
    </LoginFormBox>
  );
};
const LoginFormBox = styled.div`
  width: 100%;
`;
const InputFormBox = styled.form`
  .inputBox {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    & > label {
      font-size: 12px;
      margin-bottom: 8px;
    }
    & > input {
      height: 52px;
      padding-left: 12px;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    & > input::placeholder {
      color: #aaaaaa;
    }
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  text-align: center;
  color: #666666;
  & > button {
    margin: 16px 0;
    height: 52px;
    border-radius: 8px;
  }
  .moveText {
    cursor: pointer;
  }
`;
export default LoginForm;
