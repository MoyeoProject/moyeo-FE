import styled from 'styled-components';

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
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background-color: #ff9c07;
  :hover {
    background-color: #ff6f00;
  }
`;

export const DeleteButton = styled.button`
  width: 100%;
  padding: 16px 0;
  margin-top: 12px;
  border: 1px solid #f87070;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #f87070;
  background-color: #fff;
  :hover {
    color: #fff;
    background-color: #f87070;
  }
`;

export const ButtonWrap = styled.div`
  background-color: #fff;
  & > div {
    padding: 0 16px;
    padding-top: 12px;
    padding-bottom: 32px;
    border: 1px solid #e9e9e9;
    border-radius: 8px 8px 0px 0px;
  }
`;
