import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getSortbyMeetings } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { SortbyButton, SortbyWrap } from '../../styles/SortbyCategoriesStyle';

const buttons = [
  { name: '인기모임', focus: false, keyword: 'popular' },
  { name: '신규모임', focus: false, keyword: 'new' },
  { name: '나의 모임', focus: false, keyword: 'calendar' },
];

export default function SortbyCategories() {
  const queryClient = useQueryClient();

  const sortMeetings = useMutation({
    mutationFn: getSortbyMeetings,
    onSuccess: (data, variables) => {
      variables && saveItem('keyword', variables);
      saveItem('category', '');
      queryClient.invalidateQueries({ queryKey: ['meetings'] });

      queryClient.resetQueries({ queryKey: ['nextMeetings'] });
      queryClient.resetQueries({ queryKey: ['meetings'] });
    },
  });

  const handleClickCategory = (keyword: string) => {
    saveItem('keyword', keyword);
    sortMeetings.mutate(keyword);
  };

  return (
    <SortbyWrap>
      {buttons.map((button) => (
        <SortbyButton
          key={button.keyword}
          type="button"
          onClick={() => handleClickCategory(button.keyword)}
          focus={button.keyword === loadItem('keyword') ? !button.focus : button.focus}
        >
          {button.name}
        </SortbyButton>
      ))}
    </SortbyWrap>
  );
}
