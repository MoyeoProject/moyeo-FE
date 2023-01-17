import styled from 'styled-components';

export const Categories = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const CategoryButton = styled.button`
  width: 30%;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 16px;
  background-color: #fff;
  color: ${(props: { focus: boolean }) => (props.focus ? '#666666' : '#aaaaaa')};
  border-bottom: ${(props: { focus: boolean }) => (props.focus ? '2px solid #666666' : 'none')};
`;
