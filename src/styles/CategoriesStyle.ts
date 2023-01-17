import styled from 'styled-components';

export const CategoriesWrap = styled.div`
  display: flex;
  padding: 20px 16px;
  background-color: #f9f9f9;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 20px;
  & > img {
    margin-bottom: 8px;
  }
  & > p {
    color: #aaaaaa;
    font-size: 10px;
  }
`;
