import styled from 'styled-components';

export const MeetingListWrap = styled.ul`
  padding: 0 16px;
  padding-top: ${(props: { keyword: string | null }) =>
    props.keyword === 'calendar' ? '40px' : '402px'};
  padding-bottom: 8px;
  border: ${(props: { keyword: string | null }) =>
    props.keyword === 'calendar' ? '1px solid #F4F4F4' : 'none'};
  border-radius: ${(props: { keyword: string | null }) =>
    props.keyword === 'calendar' ? ' 16px 16px 0px 0px' : 'none'};
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
  }
`;
