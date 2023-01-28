import { Route, Routes } from 'react-router-dom';

import KakaoLoginButton from './components/KakaoLoginButton';
import DetailPage from './pages/DetailPage';
import FollowPage from './pages/FollowPage';
import HomePage from './pages/HomePage';
import InfoEx from './pages/InfoEX';
import LoginForm from './pages/LoginPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/main" element={<HomePage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/api/users/kakao/callback" element={<KakaoLoginButton />} />
      <Route path="/follow/:keyword" element={<FollowPage />} />
      <Route path="/infoEx" element={<InfoEx />} />
    </Routes>
  );
}
