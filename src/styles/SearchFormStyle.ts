import styled from 'styled-components';

export const SearchFormWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  background-color: #fff;
`;

export const InputField = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  padding-left: 36px;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f9f9f9;
`;

export const SearchButton = styled.button`
  position: absolute;
  left: 58px;
  top: 22px;
  background-color: transparent;
`;

export const ClearButton = styled.button`
  width: 50px;
  height: 36px;
  margin-left: 8px;
  color: #f87070;
  background-color: transparent;
`;
