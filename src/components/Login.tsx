import { useState } from 'react';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = () => {
    console.log(state);
  };

  return (
    <div>
      <input type="email" name="email" value={state.email || ''} onChange={handleChange} placeholder="이메일작성" />
      <input
        type="password"
        name="password"
        value={state.password || ''}
        onChange={handleChange}
        placeholder="비밀번호를 작성해 주세요"
      />
      <input
        type="text"
        name="username"
        value={state.username || ''}
        onChange={handleChange}
        placeholder="user의 name을 작성해주세요"
      />
      <button onClick={handleClick}>로그인</button>
    </div>
  );
};

export default Login;
