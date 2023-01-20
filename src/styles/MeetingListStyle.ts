import styled from 'styled-components';

export const MeetingListWrap = styled.ul`
  padding: 0 16px;
  padding-top: 287px;
  padding-bottom: 8px;
  background-color: #f9f9f9;
`;

export const MeetingWrap = styled.li`
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #f4f4f4;
  border-radius: 8px;
  background-color: #fff;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }
`;
