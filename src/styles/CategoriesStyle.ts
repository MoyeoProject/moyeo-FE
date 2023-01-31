import styled from 'styled-components';

export const CategoriesWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 20px 16px;
  background-color: #f9f9f9;
`;

export const CategoryButton = styled.button`
  background-color: #f9f9f9;
  & > div {
    display: flex;
    flex-direction: column;
    margin: 0 9px;
    img {
      margin-bottom: 8px;
      border: ${(props: { focus: boolean }) => (props.focus ? '1px solid #FFAB00' : 'none')};
      box-shadow: ${(props: { focus: boolean }) =>
        props.focus ? '0px 4px 20px rgba(255, 179, 0, 0.2)' : 'none'};
      border-radius: 50%;
    }
    span {
      margin-bottom: 16px;
      color: ${(props: { focus: boolean }) => (props.focus ? '#FFAB00' : '#aaaaaa')};
      font-size: 10px;
    }
  }
`;
