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
      ? '522px'
      : '88px'};
  padding-bottom: 8px;
  border-top: ${(props: { keyword: string | null }) =>
    props.keyword === 'calendar' ? '1px solid #F4F4F4' : 'none'};
  border-radius: ${(props: { keyword: string | null }) =>
    props.keyword === 'calendar' ? ' 16px 16px 0px 0px' : 'none'};
  background-color: ${(props: { keyword: string | null }) =>
    props.keyword === 'calendar' ? '#dfdfdf' : '#F4F4F4'};
  & > h2 {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

export const MeetingWrap = styled.li`
  display: flex;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #f4f4f4;
  border-radius: 16px;
  background-color: #fff;
`;

export const MeetingImg = styled.img`
  width: ${(props: { keyword: string | null }) => (props.keyword === 'calendar' ? '62px' : 'auto')};
  margin-right: 12px;
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
  background-color: #ffc107;
`;

export const Time = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 40px;
  margin-top: 16px;
  border-radius: 8px;
  color: #ecc658;
  font-size: 18px;
  font-weight: 700;
  background-color: #fffbf2;
`;

export const Detail = styled.div`
  margin-top: 8px;
  & > span {
    margin-right: 8px;
    font-size: 12px;
    color: #aaaaaa;
  }
`;
