import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as ChevronLeft } from '../../assets/chevron-left.svg';
import { getAlarmApi, meetAttendExitApi } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { NavBox, NavButtonBox } from '../../styles/DetailNavBarStyle';
import { DetailMeetPassword } from '../DetailMeetLinkButton';

import KakaoShareButton from '../KakaoShareButton';

const DetailNavBar = ({ data }: any) => {
  const [showModal, setShowModal] = useState(false);
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
    navigate(`/post/${id}`);
  };

  const useMeetAttendExit = () => {
    return useMutation(meetAttendExitApi, {
      onSuccess: (data) => {
        QueryClient.invalidateQueries();
        data?.data.data !== undefined ? alert('참여완료') : alert('모임을 취소하셨습니다.');
      },
      onError: (err: any) => {
        if (kakaoShareUser) {
          if (confirm('로그인이 필요한 페이지입니다. 로그인하시겠습니까?')) {
            location.replace('/');
          }
        }
        return alert(err.response.data.statusMsg);
      },
    });
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
              if (!data?.attend && data?.secret) {
                console.log('비밀번호방');
                setShowModal(true);
                return;
              }
              if (!data?.attend) {
                handleClickAttnedExit(id);
                return;
              }
              if (data?.attend && confirm('정말 나가시겠습니까?')) {
                handleClickAttnedExit(id);
                return;
              }
            }}
          >
            {data?.attend ? <span>➡️</span> : <span>⬅️</span>}
          </div>
        )}
        {showModal &&
          createPortal(<DetailMeetPassword onClose={() => setShowModal(false)} />, document.body)}
      </NavButtonBox>
    </NavBox>
  );
};

export default DetailNavBar;
