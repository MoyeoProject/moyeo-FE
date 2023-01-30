import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { handleEmailAlert } from '../hooks/useAlert';
import { emailAuthNumberApi, emailCheckApi, signupApi } from '../services/api';
import { emailRegex, passwordRegex, usernameRegex } from '../services/regEx';
import {
  AuthButtonBox,
  AuthFormBox,
  EmailAuthButton,
  Label,
  SignupBox,
} from '../styles/LoginFormStyle';

const SignupPage = () => {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [emailCheck, setEmailCheck] = useState(false);

  const [authNumber, setAuthNumber] = useState<string>('');
  const [emailAuthCheck, setEmailAuthCheck] = useState(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState('');

  // 정규식 확인
  const [emailRegExCheck, setEmailRegExCheck] = useState<boolean>(true);
  const [passwordRegExCheck, setPasswordRegExCheck] = useState<boolean>(true);
  const [passwordDoubleCheck, setPasswordDoubleCheck] = useState<boolean>(true);
  const [usernameRegExCheck, setUsernameRegExCheck] = useState<boolean>(true);

  const handleEmailCheck = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const emailValueCheck = emailRegex.test(email);
    if (email === '' || !emailValueCheck) {
      setEmailRegExCheck(false);
      return;
    }
    emailCheckApi(email)
      .then((res) => {
        setEmailRegExCheck(true);
        handleEmailAlert(email);
        setEmailCheck(true);
        return res;
      })
      .catch((err) => {
        alert(err.response.data.statusMsg);
        setEmailCheck(false);
      });
  };

  const handleClickEamilAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // 인증email type 찾아야함, 일단 지금은 true로 넘어감
    // emailAuthNumberApi({ email, authNumber });
    if (!emailCheck) {
      handleEmailAlert();
      return;
    }
    alert('이메일 인증이 완료되었습니다');
    setEmailAuthCheck(true);
  };

  const useSignup = () => {
    return useMutation(signupApi, {
      onSuccess: () => {
        QueryClient.invalidateQueries(['signup']);
      },
    });
  };

  const { mutate: postSignup } = useSignup();
  const handleClickSignup = () => {
    if (email && password && username === '') {
      alert('빈칸을 채워주세요.');
      return;
    }
    if (!emailAuthCheck) {
      alert('이메일 인증은 필수입니다.');
      return;
    }
    const passwordValueCheck = passwordRegex.test(password);
    if (!passwordValueCheck) {
      setPasswordRegExCheck(false);
      return;
    } else {
      setPasswordRegExCheck(true);
    }
    if (password !== passwordCheck) {
      setPasswordDoubleCheck(false);
      return;
    } else {
      setPasswordDoubleCheck(true);
    }

    const usernameValueCheck = usernameRegex.test(username);
    if (!usernameValueCheck) {
      setUsernameRegExCheck(false);
    }
    postSignup({ email, password, username });
  };

  const goLogin = () => {
    if (email || username || password === '') {
      navigate('/');
    }
    if (email || username || password !== '') {
      if (confirm('작성하신 정보는 지워집니다. 로그인페이지로 이동하시겠습니까?')) {
        navigate('/');
      } else {
        navigate('/signup');
      }
    }
  };

  return (
    <SignupBox>
      <div>
        <p>방구석 모임에 오신걸 환영합니다!</p>
        <AuthFormBox>
          <div className="inputBox">
            <p>이메일 </p>
            <div className="inputBtnBox">
              <input
                type="email"
                value={email || ''}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="이메일 주소를 입력하세요"
                readOnly={emailAuthCheck ? true : false}
              />
              <EmailAuthButton
                onClick={handleEmailCheck}
                type="button"
                disabled={emailAuthCheck ? true : false}
                disabledStyle={emailAuthCheck ? true : false}
              >
                {!emailCheck ? '이메일 인증' : emailAuthCheck ? '인증완료' : '재전송'}
              </EmailAuthButton>
            </div>
            {!emailRegExCheck ? <Label warning={true}>이메일 형식을 확인하세요</Label> : null}
          </div>

          <div className="inputBox">
            <div className="inputBtnBox">
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                onChange={(e) => {
                  setAuthNumber(e.target.value);
                }}
                readOnly={emailAuthCheck ? true : false}
              />
              <EmailAuthButton
                onClick={handleClickEamilAuth}
                type="button"
                disabled={emailAuthCheck ? true : false}
                disabledStyle={emailAuthCheck ? true : false}
              >
                {emailAuthCheck ? '인증완료' : '인증하기'}
              </EmailAuthButton>
            </div>
          </div>

          <div className="inputBox">
            <p>비밀번호 </p>
            <input
              type="password"
              value={password || ''}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="비밀번호를 작성해 주세요"
            />
            <Label warning={passwordRegExCheck ? false : true}>
              영어 대소문자, 숫자, 특수문자를 포함한 8-16자를 입력하세요
            </Label>
          </div>

          <div className="inputBox">
            <p>비밀번호 재확인 </p>
            <input
              type="password"
              value={passwordCheck || ''}
              onChange={(e) => {
                setPasswordCheck(e.target.value);
              }}
              placeholder="비밀번호를 확인 주세요"
            />
            <Label warning={passwordDoubleCheck ? false : true}>동일한 비밀번호를 입력하세요</Label>
          </div>

          <div className="inputBox">
            <p>닉네임 </p>
            <input
              type="text"
              value={username || ''}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="닉네임을 작성해주세요"
            />
            <Label warning={false}>닉네임은 5-10자를 입력하세요</Label>
          </div>
        </AuthFormBox>

        <AuthButtonBox>
          <button onClick={handleClickSignup}>가입하기</button>
          <span className="moveText" onClick={goLogin}>
            로그인 하러 가기
          </span>
        </AuthButtonBox>
      </div>
    </SignupBox>
  );
};

export default SignupPage;
