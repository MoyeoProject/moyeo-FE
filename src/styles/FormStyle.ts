import styled from 'styled-components';

export const FormWrap = styled.div`
  padding: 0 16px;
  padding-top: 84px;
  background-color: #fff;
`;

export const FormTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 20px;
`;

export const FormLabel = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
  & > label {
    font-weight: 700;
    font-size: 16px;
    color: #666666;
  }
  & > span {
    color: #f87070;
  }
`;

export const FormContents = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
`;

export const FormAlert = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: #f87070;
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
  background-color: #f4f4f4;
  cursor: auto;
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
    background-color: #f4f4f4;
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

export const TextAreaField = styled.textarea`
  text-align: start;
  line-height: 1.5;
  width: 100%;
  padding: 16px 12px;
  border: 1px solid #f4f4f4;
  border-radius: 10px;
  font-size: 16px;
  background-color: #f4f4f4;
  cursor: auto;
  resize: vertical;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 16px;
    color: #aaaaaa;
  }
`;

export const FileLabel = styled.label`
  text-align: center;
  width: 100%;
  padding: 16px 12px;
  border-radius: 10px;
  font-size: 16px;
  color: #ff9c07;
  background-color: #fff1db;
`;

export const FieldWrap = styled.div`
  position: relative;
`;

export const TextLength = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding-top: 4px;
  padding-left: 4px;
  background-color: #f4f4f4;
  & > span {
    color: #aaaaaa;
  }
`;
