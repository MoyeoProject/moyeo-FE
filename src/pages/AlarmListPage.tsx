import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { ReactComponent as Cal_right_arrow_icon } from '../assets/cal_left_arrow_icon.svg';
import { AlarmReadApi, getAlarmList } from '../services/api';
import { AlarmBox, ProfileSubNavBox, SubPageBox } from '../styles/ProfileSubPageStyle';
import { AlarmType } from '../types/DetailTypes';

type ChildrenProps = {
  children: React.ReactNode;
};

export const ProfileSubNav = ({ children }: ChildrenProps) => {
  return (
    <ProfileSubNavBox>
      <Link to="/profile">
        <Cal_right_arrow_icon />
      </Link>
      <span>{children}</span>
    </ProfileSubNavBox>
  );
};

const AlarmListPage = () => {
  const QueryClient = useQueryClient();
  const { data: alarmLists } = useQuery(['alarm'], () => {
    return getAlarmList();
  });

  const useAlarmRead = () => {
    return useMutation(AlarmReadApi, {
      onSuccess: (data) => {
        QueryClient.invalidateQueries(['alarm']);
      },
      onError: (data: any) => {
        toast(data?.response.data.statusMsg);
      },
    });
  };

  const { mutate: alarmRead } = useAlarmRead();
  const handleAlarmRead = (id: number) => {
    alarmRead(id);
  };

  return (
    <SubPageBox>
      <ProfileSubNav children={'알림'} />
      <AlarmBox>
        {alarmLists?.data.data === undefined ? (
          <div className='alarmNull'>알람이 없습니다.</div>
        ) : (
          <div className="alarmList">
            {alarmLists?.data.data.alarmLists.map((alarm: AlarmType) => {
              return (
                <div
                  key={alarm.id}
                  onClick={() => {
                    handleAlarmRead(alarm.id);
                  }}
                >
                  <div className="alarmText">{alarm.content}</div>
                  <div className="alarmTime">{alarm.createdAt.split('T')[0]}</div>
                  <div className="alarmTime">{alarm.createdAt.split('T')[1]}</div>
                </div>
              );
            })}
          </div>
        )}
      </AlarmBox>
    </SubPageBox>
  );
};
export default AlarmListPage;
