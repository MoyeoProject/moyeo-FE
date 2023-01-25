import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getSortbyMeetings } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { Categories, CategoryButton } from '../../styles/SortbyCategoriesStyle';

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
      queryClient.invalidateQueries({ queryKey: ['meetings'] });

      queryClient.resetQueries({ queryKey: ['nextMeetings'] });
      queryClient.resetQueries({ queryKey: ['meetings'] });
    },
  });

  return (
    <>
      <Categories>
        {buttons.map((button) => (
          <CategoryButton
            key={button.keyword}
            type="button"
            onClick={() => sortMeetings.mutate(button.keyword)}
            focus={button.keyword === loadItem('keyword') ? !button.focus : button.focus}
          >
            {button.name}
          </CategoryButton>
        ))}
      </Categories>
    </>
  );
}
