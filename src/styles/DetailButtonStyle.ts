import styled from 'styled-components';

export const ButtonBasic = styled.button`
  width: 343px;
  height: 54px;
  border-radius: 8px;
  background-color: #9cc8d2;
  color: white;
  font-weight: 700;
`;
export const ButtonDisabled = styled(ButtonBasic)`
  background-color: #aaaaaa;
  cursor: default;
`;
export const ButtonEdit = styled(ButtonBasic)`
  color: #666666;
  font-weight: 500;
  background-color: #e9e9e9;
`;
export const MasterButton = styled.div`
  width: 343px;
  display: flex;
  flex-grow: 1 1;
  justify-content: space-between;
`;

// --------버튼 스타일 정리
export const MasterLinkInput = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: space-between;
  input {
    width: 90%;
    padding-left: 10px;
    border: 1px solid #9cc8d2;
    border-radius: 8px;
    :focus {
      outline: 1px solid #9cc8d2;
    }
  }
  button {
    border-radius: 8px;
    background-color: #9cc8d2;
    height: 100%;
    width: 70px;
    color: white;
    font-weight: 700;
  }
  .cancle {
    color: #666666;
    font-weight: 500;
    background-color: #e9e9e9;
  }
`;
