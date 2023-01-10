import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';
import { useAppSelector } from '../store';

const AuthPage = () => {
  const isSignup = useAppSelector((state) => state.auth.isSignUp);
  return <div>{!isSignup ? <LoginForm /> : <SignUpForm />}</div>;
};

export default AuthPage;
