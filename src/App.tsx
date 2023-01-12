import { Route, Routes } from 'react-router-dom';

import Comment from './components/Comment';
import KakaoLoginButton from './components/KakaoLoginButton';
import AuthPage from './pages/AuthPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/main" element={<HomePage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/comment/:id" element={<Comment />} />
      <Route path="/api/users/kakao/callback" element={<KakaoLoginButton />} />
    </Routes>
  );
}
