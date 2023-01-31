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
      height: 160px;
      border: 1px solid red;
      margin-bottom: 20px;
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
    padding: 0 16px;
    box-sizing: border-box;
    /* white-space: nowrap;
    overflow: hidden; */
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
      font-size: 12px;
      color: #666666;
    }
  }
`;
