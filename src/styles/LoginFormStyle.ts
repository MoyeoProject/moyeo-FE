import styled from 'styled-components';

export const LoginFormBox = styled.div`
  width: 100%;
`;
export const InputFormBox = styled.form`
  .inputBox {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    & > label {
      font-size: 12px;
      margin-bottom: 8px;
    }
    & > input {
      height: 52px;
      padding-left: 12px;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    & > input::placeholder {
      color: #aaaaaa;
    }
  }
`;
export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  text-align: center;
  color: #666666;
  & > button {
    margin: 16px 0;
    height: 52px;
    border-radius: 8px;
  }
  .moveText {
    cursor: pointer;
  }
`;
