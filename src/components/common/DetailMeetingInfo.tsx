import styled from 'styled-components';

import { getDetailPage } from '../../services/api';

const DetailMeetingInfo = ({ data, isLoading, isError }: any) => {
  const date = data?.startTime.split('T')[0];
  const time = data?.startTime.split('T')[1];

  return (
    <>
      {isLoading ? <h2>로딩중입니다</h2> : null}
      {isError ? <h2>문제가 생겼습니다</h2> : null}
      <MeetingBox>
        <div className="meeting">
          <img />
          <p>모임 이름 : {data?.title}</p>
          <span>👍{data?.likeNum}</span>
          <span>👍{data?.hateNum}</span>
          <p>모임 소개 : {data?.content}</p>
        </div>
        <div className="meetingInfo">
          <p>날짜: {date}</p>
          <p>모임 시간: {time}</p>
          <p>모임 기간: {data?.duration}시간</p>
          <p>이용 플랫폼: {data?.platform}</p>
        </div>
      </MeetingBox>
    </>
  );
};
const MeetingBox = styled.div`
  .meeting {
    border: 1px solid gray;
    margin-bottom: 15px;
  }
  .meetingInfo {
    border: 1px solid gray;
    margin-bottom: 15px;
  }
`;
export default DetailMeetingInfo;
