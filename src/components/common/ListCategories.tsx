import { Link } from 'react-router-dom';

import useSetMeetings from '../../hooks/useSetMeetings';

export default function ListCategories() {
  const { isLoading, isError, handleClickSortby } = useSetMeetings();

  return (
    <>
      {isLoading ? <div>로딩중 입니다...</div> : null}
      {isError ? <div>에러가 발생...</div> : null}
      <div>
        <button type="button" onClick={() => handleClickSortby('new')}>
          신규모임
        </button>
        <button type="button" onClick={() => handleClickSortby('popular')}>
          인기모임
        </button>
        <Link to="#">나의 모임</Link>
        <div>모임리스트</div>
      </div>
    </>
  );
}
