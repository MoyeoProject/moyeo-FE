import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { isMaster } from '../../modules/authSlice';
import { getAlarmApi, meetAttendExitApi } from '../../services/api';
import { useAppSelector } from '../../store';
import { DetailTypes } from '../../types/DetailTypes';

const DetailNavBar = ({ data }: any) => {
  const { id } = useParams();
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const isMaster = useAppSelector((state) => state.auth.isMaster);

  // console.log('기본data', data);

  const handleClickMeetingEdit = (id: any) => {
    // 모임 수정페이지로 이동
  };

  const useMeetAttendExit = () => {
    return useMutation(meetAttendExitApi, {
      onSuccess: () => {
        QueryClient.invalidateQueries();
      },
      onError: (err: any) => {
        return alert(err.response.data.statusMsg);
      },
    });
  };

  const { mutate: meetAttendExit } = useMeetAttendExit();
  const handleClickAttnedExit = (id: any) => {
    meetAttendExit(id);
  };

  const useGetAlarm = () => {
    return useMutation(getAlarmApi, {
      onSuccess: () => {
        QueryClient.invalidateQueries();
      },
    });
  };

  const { mutate: getAlarm } = useGetAlarm();
  const handleClickAlarm = (id: any) => {
    getAlarm(id);
  };

  return (
    <NavBox>
      <div className="detail_nav">
        <button
          onClick={() => {
            navigate('/main');
          }}
        >
          뒤로가기
        </button>
        <span>{data?.title}</span>
        <button
          onClick={() => {
            handleClickAlarm(id);
          }}
        >
          {data?.alarm ? '알림 활성화' : '알림 비활성화'}
        </button>
        <button>모임공유</button>
        {isMaster ? (
          <button
            onClick={() => {
              handleClickMeetingEdit(id);
            }}
          >
            모임 정보 수정
          </button>
        ) : (
          <button
            onClick={() => {
              handleClickAttnedExit(id);
            }}
          >
            {data?.attend ? '모임 나가기' : '모임 참석하기'}
          </button>
        )}
      </div>
    </NavBox>
  );
};
const NavBox = styled.div`
  .detail_nav {
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
  }
`;

export default DetailNavBar;
