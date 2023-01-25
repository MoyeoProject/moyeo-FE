import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { emailAuthNumberApi, emailCheckApi } from '../services/api';
import { AuthButtonBox, AuthFormBox, SignupBox } from '../styles/LoginFormStyle';

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

  const [email, setEmail] = useState<string>('');
  const [emailCheck, setEmailCheck] = useState(false);

  const [authNumber, setAuthNumber] = useState<string>('');
  const [emailAuthCheck, setEmailAuthCheck] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const handleEmailCheck = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // 이메일 정규식 체크 => 이메일 형식인 경우에만 요청가도록
    if (email === '') {
      alert('이메일 주소를 입력해주세요.');
      return;
    }
    emailCheckApi(email)
      .then((res) => {
        alert(`${email}로 인증코드를 발송하였습니다`);
        setEmailCheck(true);
        return res;
      })
      .catch((err) => {
        alert(err.response.data.statusMsg);
        setEmailCheck(false);
        // 에러 메세지를 자세하게?
      });
  };

  const handleClickEamilAuth = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(authNumber, email);
    emailAuthNumberApi({ email, authNumber });
    if (!emailCheck) {
      alert('이메일 인증을 먼저 해주세요.');
      return;
    }
    alert('이메일 인증이 완료되었습니다');
    setEmailAuthCheck(true);
  };

  const handleClickSignup = () => {
    console.log(email, username, password, passwordCheck);

    if (email || password === '') {
      alert('빈칸을 채워주세요.');
      return;
    }
    // if (!emailAuthCheck) {
    //   alert('이메일 인증은 필수입니다.');
    //   return;
    // }
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
            <AuthButton
              onClick={handleEmailCheck}
              type="button"
              disabled={emailAuthCheck ? true : false}
              disabledStyle={emailAuthCheck ? true : false}
            >
              {!emailCheck ? '이메일 인증' : emailAuthCheck ? '인증완료' : '재전송'}
            </AuthButton>
          </div>
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
            <AuthButton
              onClick={handleClickEamilAuth}
              type="button"
              disabled={emailAuthCheck ? true : false}
              disabledStyle={emailAuthCheck ? true : false}
            >
              {emailAuthCheck ? '인증완료' : '인증하기'}
            </AuthButton>
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
          <label>영어 대소문자, 숫자, 특수문자를 포함한 8-16자를 입력하세요</label>
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
          <label>동일한 비밀번호를 입력하세요</label>
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
          <label>한글, 영어, 대소문자, 숫자, 최대 10자 이내로 입력하세요</label>
        </div>
      </AuthFormBox>
      <AuthButtonBox>
        <button onClick={handleClickSignup}>가입하기</button>
        <span className="moveText" onClick={goLogin}>
          로그인 하러 가기
        </span>
      </AuthButtonBox>
    </SignupBox>
  );
};
const AuthButton = styled.button<{ disabledStyle: boolean }>`
  background-color: ${(props) => (props.disabledStyle ? '#aaaaaa !important' : '#F4F4F4')};
  cursor: ${(props) => (props.disabledStyle ? 'default' : 'pointer')};
`;

export default SignUpForm;
