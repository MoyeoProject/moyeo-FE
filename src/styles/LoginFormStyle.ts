import styled from 'styled-components';

export const LoginFormBox = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

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
    padding: 16px;
    box-sizing: border-box;
    input:focus {
      outline: 2px solid #aaaaaa;
    }
  }
`;
export const SignupBox = styled.div`
  position: relative;
  /* height: 812px; */
  height: 100vh;
  background-color: white;
  & > div {
    width: 100%;
    height: 744px;
    padding: 44px 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    & > p {
      margin-bottom: 32px;
      font-size: 20px;
      font-weight: 700;
      font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    }
    input:focus {
      outline: 2px solid #aaaaaa;
    }
  }
`;
export const AuthFormBox = styled.form`
  .inputBox {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    color: #666666;
    & > p {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    input {
      height: 52px;
      padding-left: 12px;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    input:active {
      border: 1px solid #aaaaaa;
    }
    input::placeholder {
      color: #aaaaaa;
      font-size: 16px;
    }
    .inputBtnBox {
      display: flex;
      align-items: center;
      input {
        width: 226px;
        margin-right: 8px;
      }
      input:focus {
        outline: 2px solid #aaaaaa;
      }
      button {
        width: 109px;
        height: 50px;
        font-size: 16px;
        border-radius: 8px;
        background-color: #fff1db;
        color: #ff9c07;
      }
    }
  }
`;

export const Eye = styled.span<{ isSignup: boolean }>`
  position: absolute;
  bottom: ${(props) => (props.isSignup ? '30px' : '10px')};
  right: 16px;
  cursor: pointer;
`;

export const Label = styled.label<{ warning: boolean }>`
  margin-top: 2px;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => (props.warning ? '#F87070' : '#AAAAAA')};
`;

export const EmailAuthButton = styled.button<{ disabledStyle: boolean }>`
  background-color: ${(props) => (props.disabledStyle ? '#aaaaaa !important' : '#F4F4F4')};
  cursor: ${(props) => (props.disabledStyle ? 'default' : 'pointer')};
`;

export const AuthButtonBox = styled.div`
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
    font-weight: 500;
    font-size: 16px;
    letter-spacing: -0.5px;
    color: #ffffff;
    background-color: #ff9c07;
  }
  .kakaoBtn {
    background-color: #ffc107;
  }
  .moveText {
    font-size: 14px;
    cursor: pointer;
  }
`;
