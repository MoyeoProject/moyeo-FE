import styled from 'styled-components';

export const CategoriesWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 20px 16px;
  background-color: #f4f4f4;
`;

export const CategoryButton = styled.button`
  background-color: #f4f4f4;
  & > div {
    display: flex;
    flex-direction: column;
    margin: 0 6px;
    img {
      padding: 10px;
      margin-bottom: 8px;
      border: ${(props: { focus: boolean }) => (props.focus ? '1px solid #FF9C07' : 'none')};
      border-radius: 50%;
      background: #fff;
      box-shadow: 0px 4px 16px rgba(34, 34, 34, 0.05);
    }
    span {
      margin-bottom: 16px;
      color: ${(props: { focus: boolean }) => (props.focus ? '#FF9C07' : '#666666')};
      font-size: 14px;
    }
  }
`;
