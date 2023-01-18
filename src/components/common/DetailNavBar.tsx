import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as ChevronLeft } from '../../assets/chevron-left.svg';
import { getAlarmApi, meetAttendExitApi } from '../../services/api';
import { saveItem } from '../../services/storage';
import { NavBox, NavButtonBox } from '../../styles/DetailNavBarStyle';
import { ShareDataTypes } from '../../types/DetailTypes';
import KakaoShareButton from '../KakaoShareButton';

const DetailNavBar = ({ data }: any) => {
  const { id } = useParams();
  const QueryClient = useQueryClient();
  const navigate = useNavigate();

  const meetingTitle = data?.title;
  const shareData = {
    link: `detail/${data?.id}`,
    title: data?.title,
    content: data?.content,
  };

  const handleClickMeetingEdit = (id: any) => {
    alert('모임 수정페이지로 이동 - 연결 준비 중입니다');
    // navigate('')
  };

  const useMeetAttendExit = () => {
    return useMutation(meetAttendExitApi, {
      onSuccess: (data) => {
        QueryClient.invalidateQueries();
        data?.data.data !== undefined
          ? alert(`"${meetingTitle}" 모임에 오신걸 환영합니다!`)
          : alert('모임을 취소하셨습니다');
      },
      onError: (err: any) => {
        return alert(err.response.data.statusMsg);
      },
    });
  };

  const { mutate: meetAttendExit } = useMeetAttendExit();
  const handleClickAttnedExit = (id: any) => {
    console.log('나가기');
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
    data?.attend ? getAlarm(id) : alert('모임 참석하기 후, 알람 설정이 가능합니다');
  };

  return (
    <NavBox>
      <div
        className="navArrow"
        onClick={() => {
          navigate('/main');
          saveItem('detailKeyword', 'intro');
        }}
      >
        <ChevronLeft />
      </div>
      <p className="navTitle">{data?.title}</p>
      <NavButtonBox>
        <div
          onClick={() => {
            handleClickAlarm(id);
          }}
        >
          {data?.alarm ? <span>🔔</span> : <span>🔕</span>}
        </div>
        <KakaoShareButton shareData={shareData} />
        {data?.master ? (
          <div
            onClick={() => {
              handleClickMeetingEdit(id);
            }}
          >
            <span>✒️</span>
          </div>
        ) : (
          <div
            onClick={() => {
              handleClickAttnedExit(id);
            }}
          >
            {data?.attend ? <span>➡️</span> : <span>⬅️</span>}
          </div>
        )}
      </NavButtonBox>
    </NavBox>
  );
};

export default DetailNavBar;
