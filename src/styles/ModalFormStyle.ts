import styled from 'styled-components';

export const ModalFormWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 343px;
  height: fit-content;
  padding: 16px;
  border-radius: 15px;
  background-color: #fff;
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  & > p {
    margin: 16px 0;
    font-weight: 700;
  }
`;

export const ButtonsWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Overlay = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`;

export const InputField = styled.input`
  width: 100%;
  padding: 16px 12px;
  border: 1px solid #f4f4f4;
  border-radius: 10px;
  font-size: 16px;
  background-color: #f9f9f9;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #aaaaaa;
  }
`;
