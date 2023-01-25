import styled from 'styled-components';

export const DetailInfoBox = styled.div`
  height: 240px;
  padding: 0 16px;
  box-sizing: border-box;
  .FrameIcon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 11px;
  }
`;
export const MeetingCategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  .meetingBox {
    display: flex;
    margin-bottom: 20px;
    .meetingTitle {
      margin-bottom: 8px;
      line-height: 21px;
      font-size: 18px;
      font-weight: 600;
    }
    .iconBox {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #aaaaaa;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
      }
      p {
        font-size: 12px;
        margin-left: 4px;
      }
    }
  }
  .meetingText {
    white-space: nowrap;
    overflow: hidden;
    line-height: 24px;
    font-size: 12px;
    font-weight: 500;
    color: #666666;
  }
`;
export const MeetingInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  & > p {
    font-size: 12px;
    font-weight: 700;
    color: #666666;
    margin-bottom: 12px;
  }
  .infoContentBox {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .dateInfo {
      font-size: 12px;
      color: #aaaaaa;
      div {
        display: flex;
        margin-bottom: 8px;
        p {
          margin-left: 4px;
        }
      }
      div:last-child {
        margin-bottom: 0px;
      }
    }
  }
`;
