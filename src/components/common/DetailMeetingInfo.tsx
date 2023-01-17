import styled from 'styled-components';

import { ReactComponent as Frame_category } from '../../assets/Frame_category.svg';
import { ReactComponent as Frame_platform } from '../../assets/Frame_platform.svg';
import { getDetailPage } from '../../services/api';

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
const DetailInfoBox = styled.div`
  height: 240px;
  padding: 0 16px;
  box-sizing: border-box;
`;
const MeetingBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  .meetingBox {
    display: flex;
    margin-bottom: 20px;
    .icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 11px;
    }
    .meetingTitle {
      font-size: 18px;
      font-weight: 600;
    }
    div span {
      margin-right: 10px;
      color: #aaaaaa;
    }
  }
  .titleIntroText {
    white-space: nowrap;
    overflow: hidden;
    line-height: 24px;
    font-size: 12px;
    font-weight: 500;
    color: #666666;
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  p {
    font-size: 12px;
    font-weight: 500;
    color: #666666;
    margin-bottom: 12px;
  }
  .infoBoxContent {
    display: flex;
    .icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 11px;
    }
    p {
      color: #aaaaaa;
      margin-bottom: 8px;
    }
  }
`;
export default DetailMeetingInfo;
