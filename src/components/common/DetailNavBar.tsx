import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as ChevronLeft } from '../../assets/chevron-left.svg';
import { handleAttendAlert } from '../../hooks/useAlert';
import { useMeetAttendExit } from '../../hooks/useAttendButton';
// import { useMeetAttendExit } from '../../hooks/useAttendButton';
import { getAlarmApi, meetAttendExitApi } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { NavBox, NavButtonBox } from '../../styles/DetailNavBarStyle';
import KakaoShareButton from '../KakaoShareButton';

const DetailNavBar = ({ data }: any) => {
  const kakaoShareUser = loadItem('isLogin') === 'kakaoShare';
  const { id } = useParams();

  const QueryClient = useQueryClient();
  const navigate = useNavigate();

  const shareData = {
    link: `detail/${data?.id}`,
    title: data?.title,
    content: data?.content,
  };

  const handleClickMeetingEdit = (id: string | undefined) => {
    // saveItem(JSON.stringfy('currPost',))
    navigate(`/post/${id}`);
  };

  const { mutate: meetAttendExit } = useMeetAttendExit();
  const handleClickAttnedExit = (id: string | undefined) => {
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
  const handleClickAlarm = (id: string | undefined) => {
    data?.attend ? getAlarm(id) : alert('모임 참석하기 후, 알람 설정이 가능합니다');
  };

  return (
    <NavBox>
      <div
        className="navArrow"
        onClick={() => {
          {
            kakaoShareUser
              ? confirm('로그인이 필요한 페이지입니다. 로그인하시겠습니까?')
                ? location.replace('/')
                : null
              : navigate('/main');
            saveItem('detailKeyword', 'intro');
          }
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
              if (!data?.attend) {
                handleAttendAlert(true);
                handleClickAttnedExit(id);
                return;
              } else {
                handleAttendAlert(false, id);
                return;
              }
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
