import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { ReactComponent as Cal_right_arrow_icon } from '../assets/cal_left_arrow_icon.svg';
import { ReactComponent as Icon_X } from '../assets/n_X_Box.svg';
import { ReactComponent as Icon_Setting } from '../assets/settings.svg';
import { AlarmAllDeleteApi, AlarmReadApi, getAlarmList } from '../services/api';
import { AlarmBox, SubNavBox, SubPageBox } from '../styles/ProfileSubPageStyle';
import { AlarmType } from '../types/DetailTypes';

type ChildrenProps = {
  children: React.ReactNode;
};

export const SubNav = ({ children }: ChildrenProps) => {
  const navigate = useNavigate();
  return (
    <SubNavBox>
      <div>
        <p
          onClick={() => {
            navigate(-1);
          }}
        >
          <Cal_right_arrow_icon />
        </p>
        <span>{children}</span>
      </div>
      <span>
        {/* <Icon_Setting /> */}
      </span>
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

  const useAllDeleteAlarm = () => {
    return useMutation(AlarmAllDeleteApi, {
      onSuccess: () => {
        QueryClient.invalidateQueries(['alarm']);
      },
      onError: (data: any) => {
        toast(data?.response.data.statusMsg);
      },
    });
  };

  const { mutate: alarmAllDelete } = useAllDeleteAlarm();
  const handleAlarmDelete = () => {
    Swal.fire({
      position: 'center',
      width: '365px',
      text: '모든 알람을 삭제하시겠습니까?',
      confirmButtonText: '네',
      cancelButtonText: '취소',
      icon: 'warning',
      iconColor: '#F1F1F1',
      showCancelButton: true,
      confirmButtonColor: '#aaaaaa',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        alarmAllDelete();
      }
    });
  };

  return (
    <SubPageBox>
      <SubNav children={'알림'} />
      <AlarmBox>
        {alarmLists?.data.data === undefined ? (
          <div className="alarmNull">알람이 없습니다.</div>
        ) : (
          <div className="alarmList">
            <p onClick={handleAlarmDelete}>전체삭제</p>
            {alarmLists?.data.data.alarmList.map((alarm: AlarmType) => {
              return (
                <div key={alarm.id}>
                  <div className="alarmText">{alarm.content}</div>
                  <div className="minibox">
                    <div>
                      <p className="alarmTime">{alarm.createdAt.split('T')[0]}</p>
                      <p className="alarmTime">{alarm.createdAt.split('T')[1].split('.')[0]}</p>
                    </div>
                    <p
                      onClick={() => {
                        handleAlarmRead(alarm.id);
                      }}
                    >
                      <Icon_X />
                    </p>
                  </div>
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
