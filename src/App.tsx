import { Route, Routes } from 'react-router-dom';

import KakaoLoginButton from './components/KakaoLoginButton';
import AccountPage from './pages/AccountPage';
import AlarmListPage from './pages/AlarmListPage';
import DetailPage from './pages/DetailPage';
import FollowPage from './pages/FollowPage';
import HomePage from './pages/HomePage';
import InfoDeveloperPage from './pages/InfoDeveloperPage';
import LoginForm from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import RePasswordPage from './pages/RePasswordPage';
import MettingReviewPage from './pages/ReviewPage';
import SearchPage from './pages/SearchPage';
import SignupPage from './pages/SignupPage';
import AlarmConnect from './services/alarmConnect';

export default function App() {
  AlarmConnect();
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/repassword" element={<RePasswordPage />} />
      <Route path="/main" element={<HomePage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/follow/:keyword" element={<FollowPage />} />
      <Route path="/alarm" element={<AlarmListPage />} />
      <Route path="/review/:id" element={<MettingReviewPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/developer" element={<InfoDeveloperPage />} />
      <Route path="/api/users/kakao/callback" element={<KakaoLoginButton />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}
