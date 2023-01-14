import styled from 'styled-components';

import { getDetailPage } from '../../services/api';

const DetailMeetingInfo = ({ data, isLoading, isError }: any) => {
  const date = data?.startTime.split('T')[0];
  const time = data?.startTime.split('T')[1];
  return (
    <>
      {/* {isLoading ? <h2>로딩중입니다</h2> : null}
      {isError ? <h2>문제가 생겼습니다</h2> : null} */}
      <>
        <TitleBox>
          <div className="titleIntroBox">
            {/* 카테고리 이미지 */}
            <img src="/img/ex.png" />
            <div>
              <p className="meetingTitle">{data?.title}</p>
              <span>👍{data?.likeNum}</span>
              <span>👎{data?.hateNum}</span>
            </div>
          </div>
          <p className="titleIntroText">{data?.content}</p>
        </TitleBox>
        <InfoBox>
          <p>{data?.title}</p>
          <div className="infoBoxContent">
            <img src="/img/ex.png" />
            {/* <img src={`${data?.platform}`} /> */}
            {/* 플랫폼 로고 이미지는 누가주는가? */}
            <div>
              <p>📆 {date}</p>
              <p>
                🕓 {time} {data?.duration}시간
              </p>
            </div>
          </div>
        </InfoBox>
      </>
    </>
  );
};
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  .titleIntroBox {
    display: flex;
    margin-bottom: 20px;
    img {
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
    img {
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
