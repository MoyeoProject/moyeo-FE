import styled from 'styled-components';

export const SearchFormWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  background-color: #fff;
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
