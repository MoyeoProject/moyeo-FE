import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getDetailPage } from '../../services/api';

const DetailMeetingInfo = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(['detail', id], () => {
    return getDetailPage(id);
  });
  // const d = data?.data;
  const d = data?.data.data;
  console.log(data);
  return (
    <>
      {isLoading ? <h2>로딩중입니다</h2> : null}
      {isError ? <h2>문제가 생겼습니다</h2> : null}
      <MeetingBox>
        <div className="meeting">
          <img />
          <p>모임 이름 : {d?.title}</p>
          <span>👍{d?.likeNum}</span>
          <span>👍{d?.hateNum}</span>
          <p>모임 소개 : {d?.content}</p>
        </div>
        <div className="meetingInfo">
          <p>날짜: {d?.startDate}</p>
          <p>모임 시간: {d?.startTime}</p>
          <p>모임 기간: {d?.duration}</p>
          <p>이용 플랫폼: {d?.platform}</p>
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
