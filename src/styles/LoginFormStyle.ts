import styled from 'styled-components';

export const LoginFormBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .logoBox {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
  .loginBox {
    width: 100%;
    position: absolute;
    top: 186px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
export const InputFormBox = styled.form`
  .inputBox {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    color: #666666;
    & > label {
      margin-bottom: 8px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: -0.5px;
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
export const LoginButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0;
  text-align: center;
  color: #666666;
  .line {
    font-size: 12px;
    color: #aaaaaa;
  }
  & > button {
    margin: 16px 0;
    height: 52px;
    border-radius: 8px;
    letter-spacing: 2px;
    font-weight: 700;
    color: #666666;
  }
  .moveText {
    font-size: 12px;
    cursor: pointer;
  }
`;
