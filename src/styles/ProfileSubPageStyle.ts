import styled from 'styled-components';

export const SubPageBox = styled.div`
  height: 100%;
  background-color: #ffffff;
`;

export const ProfileSubNavBox = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  height: 56px;
  width: 375px;
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border-bottom: 1px solid #f4f4f4;
  background-color: white;
  & > span {
    margin-left: 16px;
  }
`;

export const FollowListBox = styled.div`
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: white;
  padding: 16px;
  box-sizing: border-box;
  .followTitle {
    margin-bottom: 8px;
    color: #222222;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    & > span {
      color: #ffab00;
    }
  }
  .followList {
    height: 670px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const DeveloperBox = styled.div`
  padding: 16px;
  box-sizing: border-box;
  & > p {
    margin-bottom: 20px;
  }
  .developer {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    .devPerson {
      border: 1px solid #e9e9e9;
      width: 167px;
      height: 152px;
      margin-bottom: 8px;
      padding: 16px;
      box-sizing: border-box;
      border-radius: 16px;
      & > div {
        border-bottom: 1px solid #e9e9e9;
        padding-bottom: 12px;
        box-sizing: border-box;
        margin-bottom: 12px;
      }
      button {
        width: 100%;
        height: 42px;
        color: white;
        font-weight: 500;
        font-size: 16px;
        border-radius: 8px;
        background-color: #ffab00;
      }
    }
  }
`;

export const AlarmBox = styled.div`
  height: 100%;
  margin-top: 56px;
  .alarmList {
    & > div {
      padding: 16px;
      box-sizing: border-box;
      margin-bottom: 10px;
      border-bottom: 1px solid #f4f4f4;
    }
    .alarmText {
      margin-bottom: 20px;
      font-size: 16px;
      letter-spacing: -0.5px;
      color: #222222;
    }
    .alarmTime {
      font-size: 14px;
      color: #666666;
    }
  }
`;
