import styled from 'styled-components';

import { ReactComponent as Frame_category } from '../../assets/Frame_category.svg';
import { ReactComponent as Frame_platform } from '../../assets/Frame_platform.svg';
import { DetailInfoBox, InfoBox, MeetingBox } from '../../styles/DetailMeetingInfoStyle';

const DetailMeetingInfo = ({ data, isLoading, isError }: any) => {
  return (
    <>
      {/* {isLoading ? <h2>로딩중입니다</h2> : null}
      {isError ? <h2>문제가 생겼습니다</h2> : null} */}
      <DetailInfoBox>
        <MeetingBox>
          <div className="meetingBox">
            <div className="icon">
              <Frame_category />
            </div>
            <div>
              <p className="meetingTitle">{data?.title}</p>
              <span>👍{data?.likeNum}</span>
              <span>👎{data?.hateNum}</span>
            </div>
          </div>
          <p className="titleIntroText">{data?.content}</p>
        </MeetingBox>
        <InfoBox>
          <p>{data?.title}</p>
          <div className="infoBoxContent">
            <div className="icon">
              <Frame_platform />
            </div>
            <div>
              <p>📆 {data?.startDate}</p>
              <p>
                🕓 {data?.startTime} {data?.duration}시간
              </p>
            </div>
          </div>
        </InfoBox>
      </DetailInfoBox>
    </>
  );
};

export default DetailMeetingInfo;
