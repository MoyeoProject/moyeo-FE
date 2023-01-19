import styled from 'styled-components';

export const FormWrap = styled.div`
  padding: 32px 16px;
  margin-top: 52px;
  background-color: #fff;
`;

export const FormTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 20px;
`;

export const FormLabel = styled.label`
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 16px;
  color: #666666;
`;

export const FormContents = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
`;

export const FormAlert = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: #aaaaaa;
`;

export const InputFieldBox = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const InputField = styled.input`
  text-align: start;
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

export const TimeInputField = styled.div`
  & > div {
    width: 100%;
    padding: 16px 12px;
    border: 1px solid #f4f4f4;
    border-radius: 10px;
    font-size: 16px;
    background-color: #f9f9f9;
    .ant-picker-input {
      input {
        font-size: 16px;
      }
    }
  }
`;

export const ArrowImg = styled.img`
  position: absolute;
  right: 18px;
  width: 12px;
`;
