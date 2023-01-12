import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getAlarmApi, meetAttendExitApi } from '../../services/api';
import { DetailTypes } from '../../types/DetailTypes';

const DetailNavBar = ({ data }: any) => {
  const { id } = useParams();
  const QueryClient = useQueryClient();
  const navigate = useNavigate();

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
    // ClickAttnedExit(id);
    // Detail Button이랑 겹침 공통으로 쓸 수 있게 hook으로 빼보기
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
    data?.attend ? getAlarm(id) : alert('모임 참석하기 후, 알람 설정이 가능합니다');
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
          <img
            style={{ width: '30px' }}
            src={data?.alarm ? '/img/alarmOn.png' : '/img/alarmOff.png'}
          />
        </button>
        <button>모임공유</button>
        {data?.master ? (
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
