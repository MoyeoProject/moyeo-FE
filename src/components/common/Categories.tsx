import { useMutation, useQueryClient } from '@tanstack/react-query';

import category_alcohol from '../../assets/category_alcohol.svg';
import category_all from '../../assets/category_all.svg';
import category_chat from '../../assets/category_chat.svg';
import category_food from '../../assets/category_food.svg';
import category_games from '../../assets/category_games.svg';
import category_hobbies from '../../assets/category_hobbies.svg';
import category_movies from '../../assets/category_movies.svg';
import category_study from '../../assets/category_study.svg';
import { getSortbyMeetings } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { CategoriesWrap, CategoryButton } from '../../styles/CategoriesStyle';

const buttons = [
  { name: '수다모여', category: category_chat, focus: false },
  { name: '술모여', category: category_alcohol, focus: false },
  { name: '밥모여', category: category_food, focus: false },
  { name: '영화모여', category: category_movies, focus: false },
  { name: '취미모여', category: category_hobbies, focus: false },
  { name: '공부모여', category: category_study, focus: false },
  { name: '게임모여', category: category_games, focus: false },
  { name: '일단모여', category: category_all, focus: false },
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
            <img src={button.category} alt={button.category} />
            <span>{button.name}</span>
          </div>
        </CategoryButton>
      ))}
    </CategoriesWrap>
  );
}
