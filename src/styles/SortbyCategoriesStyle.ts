import styled from 'styled-components';

export const SortbyWrap = styled.div`
  z-index: 1;
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #e9e9e9;
  box-shadow: 0px 10px 16px rgba(34, 34, 34, 0.05);
`;

export const SortbyButton = styled.button`
  width: 30%;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 700;
  border-bottom: ${(props: { focus: boolean }) => (props.focus ? '2px solid #FF9C07' : 'none')};
  color: ${(props: { focus: boolean }) => (props.focus ? '#FF9C07' : '#aaaaaa')};
  background-color: #fff;
`;
