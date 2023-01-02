import { useQuery } from '@tanstack/react-query';
// import { getPost } from '../services/api';
import Login from '../components/Login';

export default function HomePage() {
  // 리액트 쿼리 관련된 로직
  const { isLoading, isError, data } = useQuery({
    queryKey: ['posts'], // queryFn: getPost,
  });

  return (
    <>
      <Login />
    </>
  );
}
