import styled from 'styled-components';

export const SubPageBox = styled.div`
  height: 100vh;
  position: relative;
  background-color: #f5f5f5;
`;

export const SubNavBox = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  height: 56px;
  width: 375px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border-bottom: 1px solid #f4f4f4;
  background-color: white;
  font-size: 18px;
  font-weight: 700;
  & > div {
    cursor: pointer;
  }
  & > span {
    margin-left: 16px;
  }
`;

export const FollowListBox = styled.div`
  position: relative;
  height: 100%;
  margin-top: 112px;
  background-color: white;

  .followTitle {
    position: fixed;
    top: 56px;
    width: 375px;
    padding: 16px;
    box-sizing: border-box;
    margin-bottom: 8px;
    color: #222222;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    background-color: white;
    & > span {
      color: #ffab00;
      padding-left: 4px;
    }
  }
  .followList {
    height: 670px;
    padding: 16px;
    box-sizing: border-box;
    /* overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    } */
  }
`;

export const DeveloperBox = styled.div`
  height: 100vh;
  padding: 88px 16px 16px;
  box-sizing: border-box;
  background-color: white;
  & > p {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    color: #222222;
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
        font-size: 16px;
        font-weight: 700;
      }
      & > div > p:last-child {
        margin-top: 12px;
        color: #666666;
        font-size: 14px;
        font-weight: 500;
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
  margin-top: 56px;
  height: 100vh;
  background-color: white;
  .alarmNull {
    height: 100px;
    padding-top: 30px;
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    color: #666666;
  }
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

export const AccountBox = styled.div`
  padding-top: 56px;
  box-sizing: border-box;
  background-color: white;
  & > p {
    height: 48px;
    padding: 16px;
    box-sizing: border-box;
    font-size: 12px;
    border-bottom: 1px solid #f4f4f4;
  }
  div {
    height: 48px;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #f4f4f4;
    span {
      cursor: pointer;
    }
  }
`;