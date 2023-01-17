import styled from 'styled-components';

export const SearchFormWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 12px 16px;
  background-color: #f9f9f9;
`;

export const InputField = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  background-color: #f1f1f1;
  & > button {
    margin-right: 12px;
  }
  & > input {
    font-size: 14px;
    background-color: transparent;
    :focus {
      outline: none;
    }
    ::placeholder {
      color: #aaaaaa;
    }
  }
`;
