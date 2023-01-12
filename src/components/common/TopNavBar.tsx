import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function TopNavBar({ name }: { name: string }) {
  const { id } = useParams();

  const handleClickLogout = () => {
    location.assign('/');
    localStorage.clear();
  };

  return name === 'home' ? (
    <>
      <Link to="/main">로고</Link>
      <Link to="/post">모임생성</Link>
      <Link to="#">프로필</Link>
      <button type="button" onClick={() => handleClickLogout()}>
        로그아웃
      </button>
    </>
  ) : name === 'post' ? (
    id ? (
      <>
        <button type="button" onClick={() => history.back()}>
          {'<'}
        </button>
        <p>모임 수정하기</p>
        <button type="button" onClick={() => handleClickLogout()}>
          로그아웃
        </button>
      </>
    ) : (
      <>
        <button type="button" onClick={() => history.back()}>
          {'<'}
        </button>
        <p>모임 생성하기</p>
        <button type="button" onClick={() => handleClickLogout()}>
          로그아웃
        </button>
      </>
    )
  ) : null;
}
