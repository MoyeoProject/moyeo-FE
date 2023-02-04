import styled from 'styled-components';

export const MeetingCategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  .meetingBox {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .meetingImg {
      position: relative;
      height: 160px;
      margin-bottom: 20px;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      & > p {
        position: absolute;
        bottom: 16px;
        right: 16px;
        cursor: pointer;
      }
    }
    .meetingInfo {
      padding: 0 16px;
      box-sizing: border-box;
    }
    .meetingPlatform {
      width: fit-content;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 10px;
      box-sizing: border-box;
      margin-bottom: 4px;
      border-radius: 10000px;
      font-weight: 500;
      font-size: 12px;
      background-color: #f4f4f4;
      color: #666666;
    }
    .meetingTitle {
      margin-bottom: 8px;
      line-height: 21px;
      font-size: 20px;
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
    padding: 0 16px;
    box-sizing: border-box;
    line-height: 24px;
    font-size: 12px;
    font-weight: 500;
    color: #666666;
  }
`;
export const MeetingInfoBox = styled.div`
  .infoBox {
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    & > p {
      margin-bottom: 4px;
      color: #222222;
      font-size: 14px;
      font-weight: 700;
    }
    .infoContentBox {
      font-size: 14px;
      color: #666666;
    }
  }
`;
