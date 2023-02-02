import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as Cal_right_arrow_icon } from '../assets/cal_left_arrow_icon.svg';
import { AlarmReadApi, getAlarmList } from '../services/api';
import { AlarmBox, SubNavBox, SubPageBox } from '../styles/ProfileSubPageStyle';
import { AlarmType } from '../types/DetailTypes';

type ChildrenProps = {
  children: React.ReactNode;
};

export const SubNav = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();
  return (
    <SubNavBox>
      <div
        onClick={() => {
          navigate(-1);
        }}
      >
        <Cal_right_arrow_icon />
      </div>
      <span>{children}</span>
    </SubNavBox>
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
      <SubNav children={'알림'} />
      <AlarmBox>
        {alarmLists?.data.data === undefined ? (
          <div className="alarmNull">알람이 없습니다.</div>
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
