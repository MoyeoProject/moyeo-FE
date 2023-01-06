import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';

type signupProps = {
  isSignup: boolean;
  setIsSignup: boolean;
};

const AuthPage = () => {
  // const isSignup = useSelector((state) => state);
  // console.log(isSignup);
  // return <div>{!isSignup ? <LoginForm /> : <SignUpForm />}</div>;
};

export default AuthPage;
