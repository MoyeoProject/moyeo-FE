import { Link } from 'react-router-dom';

export default function TopNavBar() {
  return (
    <>
      <Link to="/">로고</Link>
      <Link to="#">모임 생성</Link>
      <Link to="#">프로필</Link>
    </>
  );
}
