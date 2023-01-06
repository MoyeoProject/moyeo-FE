import { Route, Routes } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignupForm';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  );
}
