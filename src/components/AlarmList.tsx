import React from 'react';

import { InfoNav } from '../pages/FollowPage';
import { AlarmBox, InfoBox } from '../styles/InfoBoxStyle';

export const AlarmList = () => {
  return (
    <InfoBox>
      <InfoNav children={'알림'} />
      <AlarmBox>
        <div className="alarmList">
          <div className="alarmText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nisi alias ea recusandae
            amet.
          </div>
          <div className="alarmTime">2023.01.31</div>
        </div>
      </AlarmBox>
    </InfoBox>
  );
};
