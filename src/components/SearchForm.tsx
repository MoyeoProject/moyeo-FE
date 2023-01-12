import { useMutation } from '@tanstack/react-query';

import useChangeInputField from '../hooks/useChangeInputField';
import { getSortbyMeetings } from '../services/api';
import { saveItem } from '../services/storage';

export default function SearchForm() {
  const { inputField, handleChangeInputField, handleClearInputField } = useChangeInputField();

  const searchMeetings = useMutation({
    mutationFn: getSortbyMeetings,
    onSuccess: (data, variables) => {
      alert('검색완료!');
      variables && saveItem('keyword', variables);
      location.reload();
    },
  });

  const handleClickSearch = (keyword: string) => {
    keyword ? searchMeetings.mutate(keyword) : alert('검색어를 입력해주세요!');
    handleClearInputField();
  };

  const handleEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode == 13) {
      searchMeetings.mutate(inputField);
      handleClearInputField();
    }
  };

  return (
    <div>
      <input
        onKeyUp={handleEnterKey}
        type="text"
        value={inputField ? inputField : ''}
        placeholder="검색어 입력..."
        onChange={(e) => handleChangeInputField(e)}
      />
      <button type="button" onClick={() => handleClickSearch(inputField)}>
        검색
      </button>
    </div>
  );
}
