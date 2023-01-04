import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSortbyMeetings } from '../../services/api';
import { setMeetingList } from '../../slice';

export default function ListCategories() {
  const dispatch = useDispatch();

  const sortMeetings = useMutation({
    mutationFn: getSortbyMeetings,
    onSuccess: (data) => {
      alert('정렬완료!');
      dispatch(setMeetingList(data?.data));
    },
  });

  const handleClickSortby = (keyword: string) => {
    sortMeetings.mutate(keyword);
  };

  return (
    <>
      <div>
        <button type="button" onClick={() => handleClickSortby('new')}>
          신규모임
        </button>
        <button type="button" onClick={() => handleClickSortby('popular')}>
          인기모임
        </button>
        <Link to="#">나의 모임</Link>
      </div>
    </>
  );
}
