import styled from 'styled-components';

export const HomeButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background-color: #aaaaaa;
`;

export const ModalButton = styled.button`
  width: 48%;
  padding: 16px 0;
  margin-top: 16px;
  border-radius: 8px;
  font-size: 16px;
  color: ${(props: { isColor: boolean }) => (props.isColor ? '#fff' : '#aaaaaa')};
  background-color: ${(props: { isColor: boolean }) => (props.isColor ? '#FF9C07' : '#F1F1F1')};
  :hover {
    color: #fff;
    background-color: ${(props: { isColor: boolean }) => (props.isColor ? '#FF6F00' : '#666666')};
  }
`;

export const PostButton = styled.button`
  width: 100%;
  padding: 16px 0;
  margin-top: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  color: '#fff';
  background-color: '#D9D9D9';
`;
