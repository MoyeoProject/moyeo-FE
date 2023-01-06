import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import KakaoLoginButton from './KakaoLoginButton';

const SignUpForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newList = {
      email: email,
      password: password,
      passwordCheck: passwordCheck,
      username: username,
    };
    console.log(newList);
  };

  const handleEmailCheck = (e: any) => {
    e.preventDefault();
    console.log(email);
  };

  // if(password !== passwordCheck) {
  //   alert('비밀번호를 한번 더 확인해주세요')
  //   return
  // }

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
        <input
          type="text"
          value={username || ''}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="user의 name을 작성해주세요"
        />
        <button type="submit">회원가입</button>
      </form>
      <KakaoLoginButton />
      <button
        onClick={() => {
          navigate('/login');
        }}
      >
        로그인 하러 가기
      </button>
    </>
  );
};

export default SignUpForm;
