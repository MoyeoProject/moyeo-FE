import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { InfoNav } from './FollowPage';
import { getAlarmList } from '../services/api';
import { AlarmBox, InfoBox } from '../styles/InfoBoxStyle';
import { AlarmType } from '../types/DetailTypes';

export const AlarmListPage = () => {
  const { data: alarmLists } = useQuery(['member'], () => {
    return getAlarmList();
  });

  const alarmList = alarmLists?.data.data.alarmLists;
  return (
    <InfoBox>
      <InfoNav children={'알림'} />
      <AlarmBox>
        <div className="alarmList">
          {alarmList.map((alarm: AlarmType) => {
            return (
              <div key={alarm.id}>
                <div className="alarmText">{alarm.content}</div>
                <div className="alarmTime">{alarm.createdAt.split('T')[0]}</div>
                <div className="alarmTime">{alarm.createdAt.split('T')[1]}</div>
              </div>
            );
          })}
        </div>
      </AlarmBox>
    </InfoBox>
  );
};
