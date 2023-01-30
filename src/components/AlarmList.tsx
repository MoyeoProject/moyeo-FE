import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { InfoNav } from '../pages/FollowPage';
import { getAlarmList } from '../services/api';
import { AlarmBox, InfoBox } from '../styles/InfoBoxStyle';

type AlarmType = {
  content: string;
  createdAt: string;
  id: number;
};
export const AlarmList = () => {
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
              </div>
            );
          })}
        </div>
      </AlarmBox>
    </InfoBox>
  );
};

type alarmType = {
  id: number;
  content: string;
  isRead: boolean;
  createdAd: string;
};
