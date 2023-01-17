import styled from 'styled-components';

export const DetailInfoBox = styled.div`
  height: 240px;
  padding: 0 16px;
  box-sizing: border-box;
`;
export const MeetingBox = styled.div`
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
    & > div & > span {
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
export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  & > p {
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
    & > p {
      color: #aaaaaa;
      margin-bottom: 8px;
    }
  }
`;
