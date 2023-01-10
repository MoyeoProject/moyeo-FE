import { useMutation } from '@tanstack/react-query';

import { getSortbyMeetings } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';

export default function ListCategories() {
  const sortMeetings = useMutation({
    mutationFn: getSortbyMeetings,
    onSuccess: (data, variables) => {
      variables && saveItem('keyword', variables);
      location.reload();
    },
  });

  const handleClickSortby = (keyword: string) => {
    if (loadItem('keyword') === keyword) {
      alert('같은 카테고리라 서버데이터를 요청하지 않습니다!');
    }
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
        <button type="button" onClick={() => handleClickSortby('calendar')}>
          나의 모임
        </button>
      </div>
    </>
  );
}
