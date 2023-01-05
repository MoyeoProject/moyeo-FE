import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSortbyMeetings } from '../../services/api';
import { setMeetingList } from '../../slice';

type ListCategoriesProps = { currSortbyKeyword: string };

export default function ListCategories({ currSortbyKeyword }: ListCategoriesProps) {
  const dispatch = useDispatch();

  const sortMeetings = useMutation({
    mutationFn: getSortbyMeetings,
    onSuccess: (data, variables) => {
      const meetingList = data?.data;
      const sortbyKeyword = variables;
      dispatch(setMeetingList({ meetingList, sortbyKeyword }));
    },
  });

  const handleClickSortby = (keyword: string) => {
    currSortbyKeyword === keyword
      ? alert('같은 카테고리라 서버데이터를 요청하지 않습니다!')
      : sortMeetings.mutate(keyword);
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
