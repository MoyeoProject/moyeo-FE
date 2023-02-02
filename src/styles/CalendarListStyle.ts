import styled from 'styled-components';

export const CalendarListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 128px;
  background-color: #f4f4f4;
`;

export const CalendarWrap = styled.div`
  padding: 16px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: #fff;
`;

export const ExceptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 62px 0;
  & > p {
    color: #666666;
  }
  & > button {
    width: 145px;
    height: 42px;
    margin-top: 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    background: #aaaaaa;
  }
`;
