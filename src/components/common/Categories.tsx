import { useMutation, useQueryClient } from '@tanstack/react-query';

import category_img from '../../assets/category_img.svg';
import { getSortbyMeetings } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { CategoriesWrap, CategoryButton } from '../../styles/CategoriesStyle';

const buttons = [
  { name: '수다모여', focus: false },
  { name: '술모여', focus: false },
  { name: '밥모여', focus: false },
  { name: '영화모여', focus: false },
  { name: '취미모여', focus: false },
  { name: '공부모여', focus: false },
  { name: '게임모여', focus: false },
  { name: '일단모여', focus: false },
];

export default function Categories() {
  const queryClient = useQueryClient();

  const sortMeetings = useMutation({
    mutationFn: getSortbyMeetings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });

      queryClient.resetQueries({ queryKey: ['nextMeetings'] });
      queryClient.resetQueries({ queryKey: ['meetings'] });
    },
  });

  const handleClickCategory = (category: string) => {
    saveItem('category', category);
    sortMeetings.mutate(category);
  };

  return (
    <CategoriesWrap>
      {buttons.map((button) => (
        <CategoryButton
          key={button.name}
          type="button"
          onClick={() => handleClickCategory(button.name)}
          focus={button.name === loadItem('category') ? !button.focus : button.focus}
        >
          <div>
            <img src={category_img} />
            <span>{button.name}</span>
          </div>
        </CategoryButton>
      ))}
    </CategoriesWrap>
  );
}
