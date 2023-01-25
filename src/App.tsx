import { Route, Routes } from 'react-router-dom';

import KakaoLoginButton from './components/KakaoLoginButton';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginPage';
import PostPage from './pages/PostPage';
import SignUpForm from './pages/SignupPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/main" element={<HomePage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/api/users/kakao/callback" element={<KakaoLoginButton />} />
    </Routes>
  );
}
