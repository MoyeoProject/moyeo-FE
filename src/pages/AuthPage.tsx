import styled from 'styled-components';

import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';
import { useAppSelector } from '../store';

const AuthPage = () => {
  const isSignup = useAppSelector((state) => state.auth.isSignUp);
  return <AuthPageBox>{!isSignup ? <LoginForm /> : <SignUpForm />}</AuthPageBox>;
};

const AuthPageBox = styled.div`
  border: 1px solid gray;
  height: 812px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default AuthPage;
