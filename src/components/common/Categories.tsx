import category_img from '../../assets/category_img.svg';
import useShowModalAccordion from '../../hooks/useShowModalAccordion';
import { CategoriesWrap, Category } from '../../styles/CategoriesStyle';

export default function Categories() {
  const { modals } = useShowModalAccordion();
  const categories = modals.find((modal) => modal.name === 'category')?.options;

  return (
    <CategoriesWrap>
      {categories?.map((category) => (
        <Category key={category}>
          <img src={category_img} />
          <p>{category}</p>
        </Category>
      ))}
    </CategoriesWrap>
  );
}
