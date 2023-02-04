import styled from 'styled-components';

export const MeetingListWrap = styled.ul`
  flex-grow: 1;
  width: 100%;
  height: ${(props: { keyword: string | null }) =>
    props.keyword !== 'calendar' && props.keyword !== 'popular' && props.keyword !== 'new'
      ? '100vh'
      : 'auto'};
  padding: 0 16px;
  padding-top: ${(props: { keyword: string | null }) =>
    props.keyword === 'calendar'
      ? '40px'
      : props.keyword === 'popular' || props.keyword === 'new'
      ? '544.5px'
      : '88px'};
  padding-bottom: 8px;
  border-top: ${(props: { keyword: string | null }) =>
    props.keyword === 'calendar' ? '1px solid #F4F4F4' : 'none'};
  border-radius: ${(props: { keyword: string | null }) =>
    props.keyword === 'calendar' ? ' 16px 16px 0px 0px' : 'none'};
  background-color: #f4f4f4;
  & > h2 {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

export const MeetingWrap = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #e9e9e9;
  filter: drop-shadow(0px 4px 16px rgba(34, 34, 34, 0.05));
  border-radius: 16px;
  background-color: #fff;
`;

export const MeetingImg = styled.img`
  width: ${(props: { keyword: string | null }) => (props.keyword === 'calendar' ? '62px' : '96px')};
  height: ${(props: { keyword: string | null }) =>
    props.keyword === 'calendar' ? '62px' : '96px'};
  margin-right: 12px;
  border-radius: 8px;
  object-fit: cover;
`;

export const TimerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 342px;
  padding: 16px 36px;
  border-radius: 16px;
  background-color: #fff;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 142px;
  height: 26px;
  border-radius: 12px;
  font-size: 12px;
  color: #fff;
  background-color: #ff9c07;
`;

export const TimeWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 40px;
  margin-top: 16px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #ff9c07;
  background-color: #fff1db;
`;

export const TimeDetail = styled.div`
  margin-top: 8px;
  & > span {
    margin-right: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #aaaaaa;
  }
`;
