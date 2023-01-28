import styled from 'styled-components';

import { AlarmList } from './../components/AlarmList';

export const InfoBox = styled.div`
  height: 812px;
  background-color: #ffffff;
`;
export const InfoNavBox = styled.div`
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border-bottom: 1px solid lightgray;
  & > span {
    margin-left: 8px;
  }
`;
export const FollowListBox = styled.div`
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
  .alarmList {
    padding: 16px;
    box-sizing: border-box;
    .alarmText {
      margin-bottom: 20px;
    }
  }
`;
