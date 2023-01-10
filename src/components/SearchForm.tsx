import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import useChangeSearchField from '../hooks/useChangeSearchField';
import { setMeetingList } from '../modules/homeSlice';
import { getSortbyMeetings } from '../services/api';
import { saveItem } from '../services/storage';

export default function SearchForm() {
  const dispatch = useDispatch();
  const { searchField, handleChangeSearchField, handleClearInputField } = useChangeSearchField();

  const searchMeetings = useMutation({
    mutationFn: getSortbyMeetings,
    onSuccess: (data, variables) => {
      alert('검색완료!');

      variables && saveItem('keyword', variables);
      dispatch(setMeetingList(data));
    },
  });

  const handleClickSearch = (keyword: string) => {
    keyword ? searchMeetings.mutate(keyword) : alert('검색어를 입력해주세요!');
    handleClearInputField();
  };

  return (
    <div>
      <input
        type="text"
        value={searchField ? searchField : ''}
        placeholder="검색어 입력..."
        onChange={(e) => handleChangeSearchField(e)}
      />
      <button type="button" onClick={() => handleClickSearch(searchField)}>
        검색
      </button>
    </div>
  );
}
